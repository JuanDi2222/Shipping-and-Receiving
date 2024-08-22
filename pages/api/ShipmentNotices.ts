import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "~/server/db/index";
import { shipmentNotice } from "~/server/db/schema";
import { eq } from "drizzle-orm/expressions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const allNotices = await db.select().from(shipmentNotice);
      res.status(200).json(allNotices);
      break;
    case 'POST':
      const notice = req.body;
      await db.insert(shipmentNotice).values(notice);
      res.status(201).json(notice);
      break;
    case 'PUT':
      const updatedNotice = req.body;
      await db.update(shipmentNotice).set(updatedNotice).where(eq(shipmentNotice.id, notice.id));
      res.status(200).json(notice);
      break;
    case 'DELETE':
      const noticeId = req.body.id;
      console.log(noticeId);
      await db.delete(shipmentNotice).where(eq(shipmentNotice.id, noticeId));
      res.status(200).json({ message: 'notice deleted' });
      break;    
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
