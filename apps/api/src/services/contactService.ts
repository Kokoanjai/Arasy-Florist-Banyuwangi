import { db } from '../db/index.js';
import { contactMessages } from '../db/schema.js';
import { desc, eq } from 'drizzle-orm';

export const contactService = {
  async create(data: { name: string; email: string; message: string }) {
    const [inserted] = await db
      .insert(contactMessages)
      .values({
        name: data.name,
        email: data.email,
        message: data.message,
      })
      .returning();

    return inserted;
  },

  async getAll() {
    return db.query.contactMessages.findMany({
      orderBy: [desc(contactMessages.createdAt)],
    });
  },

  async markAsRead(id: string) {
    const [updated] = await db
      .update(contactMessages)
      .set({ isRead: true, updatedAt: new Date() })
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(contactMessages).where(eq(contactMessages.id, id)).returning();
    return deleted;
  },
};
