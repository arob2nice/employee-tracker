declare module 'asciiart-logo' {
  interface Options {
    name: string;
    font?: string;
    lineChars?: number;
  }

  function ascii(options: Options): { render: () => string };

  export = ascii;
}
