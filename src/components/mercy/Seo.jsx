import { useEffect } from 'react';
import { SITE, DEFAULT_OG_IMAGE } from '@/lib/site';

function upsertMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Lightweight per-route head manager (no external dependency).
 * Sets title, description, canonical, Open Graph / Twitter tags and an
 * optional JSON-LD structured-data block.
 */
export default function Seo({ title, description, path = '', image, jsonLd }) {
  const url = `${SITE.url}${path}`;
  const img = image || DEFAULT_OG_IMAGE;
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
    upsertCanonical(url);

    let script;
    if (serializedJsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = serializedJsonLd;
      script.setAttribute('data-seo-jsonld', 'true');
      document.head.appendChild(script);
    }
    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [title, description, url, img, serializedJsonLd]);

  return null;
}
