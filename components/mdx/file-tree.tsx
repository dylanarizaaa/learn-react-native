import { FileCode2, FileText, Folder, FolderOpen, Image as ImageIcon, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNode {
  name: string;
  comment?: string;
  folder: boolean;
  highlight: boolean;
  children: TreeNode[];
}

/**
 * Convierte texto indentado en un árbol. Las carpetas terminan en `/`,
 * los comentarios empiezan con `#` y un `*` final resalta la entrada.
 */
function parseTree(content: string): TreeNode[] {
  const root: TreeNode = { name: '', folder: true, highlight: false, children: [] };
  const stack: { indent: number; node: TreeNode }[] = [{ indent: -1, node: root }];

  for (const rawLine of content.split('\n')) {
    if (!rawLine.trim()) continue;
    const indent = rawLine.search(/\S/);
    let line = rawLine.trim();
    let comment: string | undefined;
    const hashIndex = line.indexOf(' #');
    if (hashIndex > -1) {
      comment = line.slice(hashIndex + 2).trim();
      line = line.slice(0, hashIndex).trim();
    }
    let highlight = false;
    if (line.endsWith('*')) {
      highlight = true;
      line = line.slice(0, -1).trim();
    }
    const folder = line.endsWith('/');
    const node: TreeNode = { name: folder ? line.slice(0, -1) : line, comment, folder, highlight, children: [] };

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    if (folder) stack.push({ indent, node });
  }
  return root.children;
}

function iconFor(node: TreeNode) {
  if (node.folder) return node.children.length ? FolderOpen : Folder;
  if (/\.(tsx?|jsx?|mjs|cjs)$/.test(node.name)) return FileCode2;
  if (/\.(png|jpe?g|svg|webp|gif)$/.test(node.name)) return ImageIcon;
  if (/(\.json|\.config\.\w+|\.env.*|rc)$/.test(node.name)) return Settings2;
  return FileText;
}

function TreeList({ nodes, depth }: { nodes: TreeNode[]; depth: number }) {
  return (
    <ul className={cn(depth > 0 && 'ml-[0.55rem] border-l border-border pl-3')}>
      {nodes.map((node, i) => {
        const Icon = iconFor(node);
        return (
          <li key={node.name + i} className="py-[3px]">
            <div className="flex min-w-0 items-center gap-2">
              <Icon
                className={cn('size-4 shrink-0', node.folder ? 'text-brand' : 'text-muted-foreground')}
                aria-hidden
              />
              <span
                className={cn(
                  'font-mono text-[0.8rem] whitespace-nowrap',
                  node.folder && 'font-medium',
                  node.highlight && 'rounded bg-brand-soft px-1.5 text-brand',
                )}
              >
                {node.name}
                {node.folder ? '/' : ''}
              </span>
              {node.comment && (
                <span className="truncate text-xs text-muted-foreground">— {node.comment}</span>
              )}
            </div>
            {node.children.length > 0 && <TreeList nodes={node.children} depth={depth + 1} />}
          </li>
        );
      })}
    </ul>
  );
}

export function FileTree({ content, title }: { content: string; title?: string }) {
  const nodes = parseTree(content);
  return (
    <figure className="not-prose overflow-hidden rounded-xl border border-border bg-code">
      <figcaption className="flex h-10 items-center gap-2 border-b border-border bg-code-header px-3.5 font-mono text-xs text-foreground/80">
        <Folder className="size-3.5 text-muted-foreground" aria-hidden />
        {title ?? 'Estructura de carpetas'}
      </figcaption>
      <div className="thin-scrollbar overflow-x-auto px-4 py-3">
        <TreeList nodes={nodes} depth={0} />
      </div>
    </figure>
  );
}
