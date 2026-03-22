import { eq, and, asc, ilike, desc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { products, categories, productTags } from '../db/schema.js';

export const productService = {
  async getAll(filters?: { category?: string; tag?: string }) {
    const conditions = [eq(products.isActive, true)];

    if (filters?.category) {
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, filters.category),
      });
      if (category) {
        conditions.push(eq(products.categoryId, category.id));
      }
    }

    if (filters?.tag) {
      const matchingTags = await db
        .select({ productId: productTags.productId })
        .from(productTags)
        .where(ilike(productTags.tag, filters.tag));

      const productIds = matchingTags.map((t) => t.productId);

      if (productIds.length === 0) return [];

      const result = await db.query.products.findMany({
        where: and(...conditions),
        with: { tags: true, category: true },
        orderBy: [asc(products.sortOrder)],
      });

      return result.filter((p) => productIds.includes(p.id));
    }

    return db.query.products.findMany({
      where: and(...conditions),
      with: { tags: true, category: true },
      orderBy: [asc(products.sortOrder)],
    });
  },

  // Admin: get all products including inactive
  async getAllAdmin() {
    return db.query.products.findMany({
      with: { tags: true, category: true },
      orderBy: [desc(products.createdAt)],
    });
  },

  async getBySlug(slug: string) {
    return db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { tags: true, category: true },
    });
  },

  async getById(id: string) {
    return db.query.products.findFirst({
      where: eq(products.id, id),
      with: { tags: true, category: true },
    });
  },

  async create(data: {
    categoryId: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    price: number;
    badge?: string;
    dimensions?: string;
    isActive?: boolean;
    sortOrder?: number;
    tags?: string[];
  }) {
    const { tags, ...productData } = data;

    const [inserted] = await db.insert(products).values(productData).returning();

    if (tags && tags.length > 0) {
      await db.insert(productTags).values(
        tags.map((tag) => ({ productId: inserted.id, tag }))
      );
    }

    return this.getById(inserted.id);
  },

  async update(
    id: string,
    data: Partial<{
      categoryId: string;
      name: string;
      slug: string;
      description: string;
      imageUrl: string;
      price: number;
      badge: string | null;
      dimensions: string | null;
      isActive: boolean;
      sortOrder: number;
      tags: string[];
    }>
  ) {
    const { tags, ...productData } = data;

    const [updated] = await db
      .update(products)
      .set({ ...productData, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    // If tags are provided, replace all existing tags
    if (tags !== undefined) {
      await db.delete(productTags).where(eq(productTags.productId, id));
      if (tags.length > 0) {
        await db.insert(productTags).values(
          tags.map((tag) => ({ productId: id, tag }))
        );
      }
    }

    return this.getById(updated.id);
  },

  async delete(id: string) {
    const [deleted] = await db.delete(products).where(eq(products.id, id)).returning();
    return deleted;
  },
};
