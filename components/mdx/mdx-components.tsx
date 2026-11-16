import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Hash } from 'lucide-react';
import {
  Callout,
  Card,
  Cards,
  Checklist,
  Column,
  Columns,
  Flow,
  Layers,
  Overview,
  Panel,
  SplitView,
  Step,
  Steps,
  Term,
} from './blocks';
import { CodeBlock } from './code-block';
import { CodeTabs } from './code-tabs';
import { FileTree } from './file-tree';
import { ScreenSketch, Screens } from './screen-sketch';

function heading(Tag: 'h2' | 'h3' | 'h4') {
  return function Heading({ id, children, ...props }: ComponentPropsWithoutRef<'h2'>) {
    return (
      <Tag id={id} className="group relative" {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-label="Enlace a esta sección"
            data-card
            className="ml-2 inline-flex align-middle text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
          >
            <Hash className="size-4" />
          </a>
        )}
      </Tag>
    );
  };
}

function Anchor({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  a: Anchor,
  table: (props) => (
    <div className="table-wrap thin-scrollbar">
      <table {...props} />
    </div>
  ),
  CodeBlock,
  CodeTabs,
  FileTree,
  Callout,
  Overview,
  Flow,
  Layers,
  Columns,
  Column,
  SplitView,
  Panel,
  Steps,
  Step,
  Term,
  Cards,
  Card,
  Checklist,
  ScreenSketch,
  Screens,
};
