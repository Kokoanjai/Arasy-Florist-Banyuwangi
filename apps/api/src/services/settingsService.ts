import { db } from '../db/index.js';
import { shopSettings } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const settingsService = {
  async getAll() {
    const rows = await db.select().from(shopSettings);
    const result: Record<string, string> = {};
    for (const row of rows) {
      result[row.key] = row.value;
    }
    return result;
  },

  async updateAll(data: Record<string, string>) {
    for (const [key, value] of Object.entries(data)) {
      await db
        .insert(shopSettings)
        .values({ key, value })
        .onConflictDoUpdate({
          target: shopSettings.key,
          set: { value, updatedAt: new Date() },
        });
    }
    return this.getAll();
  },
};
