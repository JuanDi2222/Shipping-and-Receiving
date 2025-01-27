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
  
  export async function sendEmail(): Promise<void> {
    const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlV4TEdDVkpHZHdZeTBfcG0xMzRkUks5RjI0NEJmbGloWHNMal9rOTBxVUkiLCJhbGciOiJSUzI1NiIsIng1dCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCIsImtpZCI6Inp4ZWcyV09OcFRrd041R21lWWN1VGR0QzZKMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzc2Yzg4NS0xYzlkLTQzZjUtYWM4Yi00ODg0ODY5YTNmMTYvIiwiaWF0IjoxNzMzODU5NTQyLCJuYmYiOjE3MzM4NTk1NDIsImV4cCI6MTczMzg2MzYxNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhZQUFBQWgvTEdURCsrRWl3VGp4S0ZKV3dQdlhBVXExbjVZOFRjNEJxa2hoRll5TFBRdmNVR01EWktXVkx6L1ByWnJPc2giLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik1UQyBTaGlwcGluZyBhbmQgUmVjZWl2aW5nIiwiYXBwaWQiOiI0MjY3MmUxNi1lYTQ5LTRiZmEtYWJkMC00NmQzOGRiYThiODIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlNJTFZBIFRFTExPIiwiZ2l2ZW5fbmFtZSI6IkpVQU4gRElFR08iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODcuMTg5LjU3LjY3IiwibmFtZSI6IlNJTFZBIFRFTExPIEpVQU4gRElFR08iLCJvaWQiOiI1YThjZjJhNS1jYmVkLTQxZWUtYWEyMi03NTdjYTdhZTEyMDciLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDEyMDZFRjRDNiIsInJoIjoiMS5BWGdBaGNoMl9KMGM5VU9zaTBpRWhwb19GZ01BQUFBQUFBQUF3QUFBQUFBQUFBQjRBQzU0QUEuIiwic2NwIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiSDZtZTQ3Q3JzaFVKa1h0Ukt1WlN2MTV4aEptMFNrcVgyUnkxOEZiUnY3cyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6ImZjNzZjODg1LTFjOWQtNDNmNS1hYzhiLTQ4ODQ4NjlhM2YxNiIsInVuaXF1ZV9uYW1lIjoiTDIwMTEyMTY2QGNkanVhcmV6LnRlY25tLm14IiwidXBuIjoiTDIwMTEyMTY2QGNkanVhcmV6LnRlY25tLm14IiwidXRpIjoiU0NLWWNJcDIxVUNJWnN5V016azdBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjMyIDEiLCJ4bXNfc3QiOnsic3ViIjoiSWVEU1JNWGpxZ2ZBbW9Hcm1vS1E1bVBDX1FFd3Q3LTJaX1Y2WEQ3LXBHYyJ9LCJ4bXNfdGNkdCI6MTYwNzYzMTQzM30.Il8SkFIMBBLEmStEargGjV9istCUFnTys07c5VL-w419oS4igiYTKMcxgYA-LOckZ7lWQXuCxqQl6h9c6yUj7ygvF1Ydb0iI7lVfQUJVayIeNZv40uPWJ5NTfpQXw1ouChTrbvej_uMv5UbI082bmeGHIU02wn_54-Dq2LG8SHHl3JGyir3bcgVRS8OGe-l5tPU2iIT4TwQOzSwyi23I23Rdb7mB2ZUDq_nqqu144UIF8vAHhSi8Ml-SmMzrnahj2WYq0m-uazx9H6XnmVH0QfWZalbI8ZJ76pNxox-TdoyT6lIM3ZGf0WqZgqz18xr1IO_t80z-dwc8_w99Ie4MgA";
  
    const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: "Hola",
          body: {
            contentType: "Text",
            content: "Hola",
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
      } as { message: EmailMessage; saveToSentItems: string }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error sending email: ${error.message}`);
    }
  }