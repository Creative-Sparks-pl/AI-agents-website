import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  sub: z.string().optional(),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/hero' }),
  schema: z.object({
    badge: z.string(),
    badgeIcon: z.string().default('auto_awesome'),
    badgeNote: z.string().optional(),
    headlineLead: z.string(),
    headlineEm: z.string(),
    headlineTail: z.string(),
    tagline: z.string(),
    bullets: z.array(z.string()),
    ctaPrimary: linkSchema,
    ctaSecondary: linkSchema,
  }),
});

const useCasesExamples = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/use-cases-examples' }),
  schema: z.object({
    examples: z.array(linkSchema),
  }),
});

const useCases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/use-cases' }),
  schema: z.object({
    order: z.number(),
    number: z.string(),
    title: z.string(),
    audience: z.string(),
    bullets: z.array(z.string()),
    quote: z.string().optional(),
    links: z.array(linkSchema),
  }),
});

const process = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/process' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    output: z.string().optional(),
    outputLink: z.string().optional(),
    outputIcon: z.string().optional(),
    quote: z.string().optional(),
    shape: z.string().optional(),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pricing' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    sub: z.string(),
    oldPrice: z.string(),
    price: z.string(),
    highlight: z.boolean().default(false),
    bg: z.string().optional(),
    features: z.array(z.string()),
  }),
});

const demoStageSchema = z.object({
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string(),
  shape: z.string(),
});

const demo = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/demo' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    intro: z.string(),
    stages: z.array(demoStageSchema),
    note: z.string().optional(),
    cta: linkSchema.optional(),
    secondaryLinks: z.array(linkSchema).optional(),
  }),
});

const freeTrial = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/free-trial' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    intro: z.string(),
    stages: z.array(demoStageSchema),
    note: z.string().optional(),
    cta: linkSchema.optional(),
  }),
});

const finalCta = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/final-cta' }),
  schema: z.object({
    heading: z.string(),
    intro: z.string(),
    cta: linkSchema,
    secondaryLinks: z.array(linkSchema).optional(),
  }),
});

const platform = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/platform' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    intro: z.string().optional(),
    contentsHeading: z.string(),
    contentsNote: z.string(),
    platforms: z.array(z.object({
      icon: z.string(),
      name: z.string(),
      desc: z.string(),
    })),
    contents: z.array(z.object({
      label: z.string(),
      desc: z.string(),
    })),
    requirements: z.array(z.string()),
  }),
});

const problems = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/problems' }),
  schema: z.object({
    order: z.number(),
    icon: z.string(),
    title: z.string(),
  }),
});

const install = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/install' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    intro: z.string().optional(),
    items: z.array(z.object({
      icon: z.string(),
      label: z.string().optional(),
      title: z.string(),
      description: z.string(),
    })),
    footerNote: z.string().optional(),
    footerLink: linkSchema.optional(),
  }),
});

const origin = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/origin' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    callout: z.string(),
    comparisons: z.array(z.object({
      label: z.string(),
      description: z.string(),
    })),
  }),
});

const architecture = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/architecture' }),
  schema: z.object({
    order: z.number(),
    icon: z.string(),
    label: z.string(),
    title: z.string(),
    desc: z.string(),
  }),
});

const comparison = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/comparison' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    lead: z.string().optional(),
    columns: z.array(z.object({
      key: z.string(),
      label: z.string(),
      sub: z.string().optional(),
      highlight: z.boolean().default(false),
    })),
    rows: z.array(z.object({
      feature: z.string(),
      cells: z.record(z.string(), z.object({
        status: z.string(),
        text: z.string(),
      })),
    })),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/faqs' }),
  schema: z.object({
    order: z.number(),
    q: z.string(),
    link: linkSchema.optional(),
  }),
});

const knowledgeBase = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/knowledge-base' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    intro: z.string().optional(),
    pageTypes: z.array(z.object({ name: z.string(), sub: z.string() })),
    frameworks: z.array(z.object({ name: z.string(), sub: z.string() })),
    patterns: z.array(z.object({ name: z.string(), sub: z.string() })),
  }),
});

const valueProps = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/value-props' }),
  schema: z.object({
    badge: z.string().optional(),
    heading: z.string(),
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      quote: z.string().optional(),
      links: z.array(linkSchema),
    })),
  }),
});

const proofGallery = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/proof-gallery' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    lead: z.string(),
    cards: z.array(z.object({
      title: z.string(),
      description: z.string(),
      shape: z.string().optional(),
      link: linkSchema,
    })),
  }),
});

const author = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/author' }),
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    nameFirst: z.string(),
    nameLast: z.string(),
    role: z.string(),
    bio: z.string(),
    email: z.string(),
    contactNote: z.string(),
    experienceLabel: z.string(),
    experienceValue: z.string(),
  }),
});

const changelog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/changelog' }),
  schema: z.object({
    version: z.string(),
    date: z.string(),
    title: z.string(),
    description: z.string(),
    changes: z.array(z.string()),
  }),
});

const nav = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/nav' }),
  schema: z.object({
    links: z.array(linkSchema),
    cta: linkSchema,
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/footer' }),
  schema: z.object({
    links: z.array(linkSchema),
    legal: z.string().optional(),
  }),
});

export const collections = {
  hero,
  'use-cases-examples': useCasesExamples,
  'use-cases': useCases,
  process,
  pricing,
  demo,
  'free-trial': freeTrial,
  'final-cta': finalCta,
  platform,
  problems,
  install,
  origin,
  architecture,
  comparison,
  faqs,
  'knowledge-base': knowledgeBase,
  'proof-gallery': proofGallery,
  'value-props': valueProps,
  author,
  changelog,
  nav,
  footer,
};
