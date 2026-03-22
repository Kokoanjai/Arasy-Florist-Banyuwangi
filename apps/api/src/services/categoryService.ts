import { eq, asc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { categories } from '../db/schema.js';

export const categoryService = {
  async getAll() {
    return db.query.categories.findMany({
      orderBy: [asc(categories.sortOrder)],
    });
  },

  async getBySlug(slug: string) {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug),
      with: {
        products: {
          with: {
            tags: true,
          },
        },
      },
    });
  },

  async getById(id: string) {
    return db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  },

  async create(data: { name: string; slug: string; description?: string; imageUrl?: string; sortOrder?: number }) {
    const [inserted] = await db.insert(categories).values(data).returning();
    return inserted;
  },

  async update(id: string, data: Partial<{ name: string; slug: string; description: string; imageUrl: string; sortOrder: number }>) {
    const [updated] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return updated;
  },

  async delete(id: string) {
    const [deleted] = await db.delete(categories).where(eq(categories.id, id)).returning();
    return deleted;
  },
};
