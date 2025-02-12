// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

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
  content: text("content"),
  author: text("author"),
});

export const posts = createTable("posts", {
  id: int("id").primaryKey(),
  title: text("title"),
  excerpt: text("excerpt"),
  content: text("content"),
  author: text("author"),
  html: text("html"),
  imageUrl: text("imageUrl"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const images = createTable("images", {
  id: int("id").primaryKey(),
  imagePath: text("imagePath"),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});