import { asc, ilike, or, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { shippingZones } from '../db/schema.js';

export const shippingService = {
  async getAll(search?: string) {
    if (search) {
      return db.query.shippingZones.findMany({
        where: or(
          ilike(shippingZones.name, `%${search}%`),
          ilike(shippingZones.areaLabel, `%${search}%`)
        ),
        orderBy: [asc(shippingZones.sortOrder)],
      });
    }

    return db.query.shippingZones.findMany({
      orderBy: [asc(shippingZones.sortOrder)],
    });
  },

  async create(data: { name: string; areaLabel?: string; price?: number; isPopular?: boolean; sortOrder?: number }) {
    const [inserted] = await db.insert(shippingZones).values(data).returning();
    return inserted;
  },

  async update(id: string, data: Partial<{ name: string; areaLabel: string; price: number; isPopular: boolean; sortOrder: number }>) {
    const [updated] = await db
      .update(shippingZones)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(shippingZones.id, id))
      .returning();
    return updated;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(shippingZones).where(eq(shippingZones.id, id)).returning();
    return deleted;
  },
};
