"use server";
import { getUserToken } from "../db/actions";
import { auth } from "~/auth";

export async function sendEmail(values: any) {
  const session = await auth();
  const accessToken = await getUserToken(session?.user?.id);

  const isPriorityOvernight = values.type === "Priority Overnight";
  const warningMessage = isPriorityOvernight
    ? `<div style="background-color: #ffcc00; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
        <strong>⚠️ Approval Required:</strong> Please seek approval from the boss for Priority Overnight shipments.
      </div>`
    : '';

  const account = values?.account || "Phinia";  

  const emailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            .header {
                background-color: #0078d4;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                color: #555555;
            }
            .footer {
                background-color: #f4f4f4;
                text-align: center;
                padding: 10px;
                font-size: 14px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Shipment Notification</h1>
            </div>
            <div class="content">
                ${warningMessage}
                <p>A new shipment has been sent to process:</p>
                <p><strong>Destination:</strong> ${values.company}</p>
                <p><strong>Country:</strong> ${values.country}</p>
                <p><strong>Service:</strong> ${values.type}</p>
                <p><strong>Account:</strong> ${values.account}</p>
                <p>Remember that the materials to be sent have to be with the shipping team before 8:30 AM for international shipments. National shipments vary by service.</p>
            </div>
            <div class="footer">
                <p>Phinia MTC Logistics Team</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: "Shipment Notification id: " + values.id,
        body: {
          contentType: "HTML",
          content: emailBody, 
        },
        toRecipients: [
          {
            emailAddress: {
              address: "l20112166@cdjuarez.tecnm.mx",
            },
          },
        ],
      },
      saveToSentItems: "true",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Response error:", errorText);
    throw new Error(`Error sending email: ${errorText}`);
  }
}