"use server";

import { db } from "~/server/db/index";
import { shipmentNotice } from "~/server/db/schema";
import { user } from "~/server/db/schema";
import { auth } from "~/auth";
import { eq } from "drizzle-orm";
import { redirect } from 'next/navigation'

export async function createShipmentNotice(values: any) {
  const notice = values;
  await db.insert(shipmentNotice).values(notice);
}

export async function getShipmentNotices() {
  const notices = await db.select().from(shipmentNotice);
  return notices;
}
export async function deleteShipmentNotice(id: number) {
  await db.delete(shipmentNotice).where(eq(shipmentNotice.id, id));
}

export async function getShipmentNotice(id: number) {
  const notice = await db.select().from(shipmentNotice).where(eq(shipmentNotice.id, id));
  return notice;
}

export async function updateShipmentNotice(values: any) {
  const notice = values;
  await db.update(shipmentNotice).set(notice).where(eq(shipmentNotice.id, notice.id));
}

export async function getUsers() {
  const session = await auth();
  const ser = await db.select().from(user)
    .where(eq(user.id, session?.user?.id));
  return ser;
}

export async function updateUser(values: any) {
  const session = await auth();
  const up = values;
  await db.update(user).set(up).where(eq(user.id, session?.user?.id));
}

export async function getAllUsers() {
  const users = await db.select().from(user);
  return users;
}

export async function updateAllUsers(values: any) {
  const userValues = values;
  await db.update(user).set(userValues).where(eq(user.id, userValues.id));
}