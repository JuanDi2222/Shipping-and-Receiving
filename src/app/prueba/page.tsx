
"use server"
import {auth} from "~/auth"

export default async function HomePage() {
    const session = await auth();
    interface EmailRecipient {
      emailAddress: {
        address: string;
      };
    }
    
    interface EmailMessage {
      subject: string;
      body: {
        contentType: string;
        content: string;
      };
      toRecipients: EmailRecipient[];
    }
    
    async function sendEmail() {
      const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlE1MzloR2w2QWpicFRwdjE4Q3BFU3JkS3VzV25OWVVYeDItZTRSdnZpaWsiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyIsImtpZCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzc2Yzg4NS0xYzlkLTQzZjUtYWM4Yi00ODg0ODY5YTNmMTYvIiwiaWF0IjoxNzM4MDEzMTY4LCJuYmYiOjE3MzgwMTMxNjgsImV4cCI6MTczODAxODM0OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhaQUFBQXVLVHVyakJVZzE1amhXYmEzTkFYN3FVRS96cmVLN2RTcUwxaU43cmMrenZjNmgzT2RXWlE5S2ZJZjhiYlhOYm8iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik1UQyBTaGlwcGluZyBhbmQgUmVjZWl2aW5nIiwiYXBwaWQiOiI0MjY3MmUxNi1lYTQ5LTRiZmEtYWJkMC00NmQzOGRiYThiODIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlNJTFZBIFRFTExPIiwiZ2l2ZW5fbmFtZSI6IkpVQU4gUEFCTE8iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODcuMTg5LjU3LjE1MSIsIm5hbWUiOiJTSUxWQSBURUxMTyBKVUFOIFBBQkxPIiwib2lkIjoiMjkwMTliOTItOGQ1ZS00NzQzLTk1ZDEtNjE4NTkyM2M4NWMyIiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxMjA2RDc3NkQiLCJyaCI6IjEuQVhnQWhjaDJfSjBjOVVPc2kwaUVocG9fRmdNQUFBQUFBQUFBd0FBQUFBQUFBQUI0QUFaNEFBLiIsInNjcCI6ImVtYWlsIE1haWwuU2VuZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQiLCJzaWQiOiIwMDEzNjhkOS1lYjlhLWJiZTgtZTJmYi1mYzg4NjI5MDYzMTkiLCJzdWIiOiJVQ0dTeHFHMnc3STRzaXZUbDdtVFFBRFNBY2VqUnNWNnpxeGZ2Um5SZnBFIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZmM3NmM4ODUtMWM5ZC00M2Y1LWFjOGItNDg4NDg2OWEzZjE2IiwidW5pcXVlX25hbWUiOiJMMjAxMTE4OThAY2RqdWFyZXoudGVjbm0ubXgiLCJ1cG4iOiJMMjAxMTE4OThAY2RqdWFyZXoudGVjbm0ubXgiLCJ1dGkiOiJaSHR1aFlJd3FVbWRCNWtlSlpkOUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2Z0ZCI6ImtlVkpXM3VxSjg4dnZVRFhKeXhkMkx5TTNjdEpvQWtMQVYtTDhhOGp0SUUiLCJ4bXNfaWRyZWwiOiIxNCAxIiwieG1zX3N0Ijp7InN1YiI6InlBX1pWcDZza19BclY1Z3c2X2hUS3RTMmc0S0RRZXhHbzlVY3NLUGEweTgifSwieG1zX3RjZHQiOjE2MDc2MzE0MzN9.bHvaYcM_1Gt-sw13Krl3uLq1WqTijZ74lLmqBJ_ytmT7gWrH_KBp-OyxL4fdtEJ7ZVyynoV6qkMy1P9gMSHxt53zomiUJ5xL8nSUY9bVzFQlslYKCWehYjI6iabepxTioOYIjdqUr65gWkWaqXcb11EZyREAPCTXWkrZ4rK3c8ScaWOL-loyoEIdvKOPuoyZJowYiN-vESeXGpqsMgdQHdPqPHojaj_fhn9qRpCLtzx_hU9KCcWBzDAcrMam29jFYo7Yb_y9A_cneG8q8ev611B5-MHozLvSQwEExUebjjNILDwjDibwePv2uhV2M7rOjEKoAMYFHVwemD8TriMPeg"; // Replace with your actual token
       

      const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: "Microsoft graph API test",
            body: {
              contentType: "Text",
              content: "Hola",
            },
            toRecipients: [
              {
                emailAddress: {
                  address: "logisticsmtc@phinia.com",
                },
              },
            ],
          },
          saveToSentItems: "true",
        }),
      });
    
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        console.error("Response error:", errorText); // Log the error
        throw new Error(`Error sending email: ${errorText}`);
      }
    }
    
    sendEmail()


  return (
    <main className="flex min-h-screen flex-col p-6 ">
    </main>
  )
}
