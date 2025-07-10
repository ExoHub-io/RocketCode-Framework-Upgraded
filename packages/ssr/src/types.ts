import { VNode, GetServerSidePropsContext, GetServerSidePropsResult } from '@rocketcode/core';

export interface SSRContext {
  url: string;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  userAgent?: string;
  req?: any;
  res?: any;
  props?: any;
}

export interface SSRResult {
  html: string;
  initialState?: any;
  head?: string[];
  body?: string[];
}

export interface PageConfig {
  getServerSideProps?: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult>;
  getStaticProps?: () => Promise<{ props: any }>;
  getStaticPaths?: () => Promise<{ paths: string[] }>;
}

export interface AppConfig {
  routes: any[];
  basePath?: string;
  trailingSlash?: boolean;
  generateEtags?: boolean;
  poweredByHeader?: boolean;
  compress?: boolean;
  devIndicators?: {
    buildActivity?: boolean;
    buildActivityPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };
}

export interface ServerOptions {
  port?: number;
  hostname?: string;
  dev?: boolean;
  config?: AppConfig;
}

export interface ExpressRequest {
  url: string;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  query: Record<string, string>;
  params: Record<string, string>;
  method: string;
  body: any;
}

export interface ExpressResponse {
  status: (code: number) => ExpressResponse;
  send: (body: any) => ExpressResponse;
  json: (body: any) => ExpressResponse;
  set: (name: string, value: string) => ExpressResponse;
  end: () => ExpressResponse;
  header: (name: string, value: string) => ExpressResponse;
} 