// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `reactblog_${name}`);

export const authors = createTable("author", {
  id: int("id").primaryKey(),
  name: text("name"),
  bio: text("bio"),
  avatar: text("avatar"),
  quote: text("quote"),
  heroImage: text("heroImage"),
});

export const socialLinks = createTable("socialLinks", {
  id: int("id").primaryKey(),
  platform: text("platform"),
  url: text("url"),
  icon: text("icon"),
});

export const books = createTable("books", {
  id: int("id").primaryKey(),
  title: text("title"),
  imageUrl: text("imageUrl"),
  link: text("link"),
  description: text("description"),
  publishDate: text("publishDate"),
});

export const posts = createTable("posts", {
  id: int("id").primaryKey(),
  title: text("title"),
  content: text("content"),
  authorId: int("authorId").references(() => authors.id),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});