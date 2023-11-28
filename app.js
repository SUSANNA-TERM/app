const { Template, Clause } = require('@accordproject/cicero-core');
const puppeteer = require('puppeteer');
const marked = require('marked');
const express = require("express");
const config = require('./config.json')


// instantiate an Express application
const app = express();

// apply json middleware globally
app.use(express.json())

// serve static files
app.use(express.static('public'));

const domain = 'localhost'
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://${domain}:${port}`);
});

app.post('/validateSignature', async (req, res) => {
    const response = await fetch('https://dilosi.services.gov.gr/api/validation/document/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data)
});

app.post('/convert', async (req, res) => {
    try {
        const markdownText = req.body.markdown;
        const htmlContent = marked(markdownText);

        const headerHtml = `
    <div style="width: 100%; text-align: center; margin-bottom: 20px;">
        <img src="https://www.zagori.gov.gr/wp-content/uploads/2016/06/logo3.png" alt="Header Image" style="width: 100px;">
    </div>
    `;

        const fullHtml = headerHtml + htmlContent;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(fullHtml);
        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        res.setHeader('Content-Disposition', 'attachment;filename=contract.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Failed to generate PDF');
    }
});

let template = null;

async function loadTemplate() {
    template = await Template.fromDirectory(config.template.location);
}

loadTemplate().then(() => {
    console.log("Template loaded successfully");
}).catch((error) => {
    console.error("Error loading template:", error);
});

app.post('/generate-contract', async (req, res) => {
    try {
        const formData = req.body;
        formData.consumerVatNumber = parseInt(formData.consumerVatNumber);
        formData.agreementId = parseInt(formData.agreementId);
        formData.floor = parseInt(formData.floor);
        formData.waterMeterNumber = parseInt(formData.waterMeterNumber);
        formData.billingCycleDays = parseInt(formData.billingCycleDays);
        formData.invoicePaymentDays = parseInt(formData.invoicePaymentDays);
        formData.supplyThreshold = parseFloat(formData.supplyThreshold);
        formData.leakNotificationLimit = parseFloat(formData.leakNotificationLimit);
        const additionalData = {
            $class: 'org.example.water.WaterSupplyAgreement',
            contractId: 'someUniqueContractId12345'
        };
        const mergedData = { ...additionalData, ...formData };

        const clause = new Clause(template);
        try {
            clause.setData(mergedData);
        } catch (setError) {
            console.log("Error setting data for clause:", setError.message);
        }

        const draftedClause = clause.draft();
        console.log(draftedClause);
        res.json({ clause: draftedClause });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
