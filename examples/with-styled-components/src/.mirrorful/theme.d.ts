export type Colors = keyof typeof Tokens.colors;
export type FontSize = keyof typeof Tokens.fontSizes;
export type Shadows = keyof typeof Tokens.boxShadows;
export type Token = Colors | FontSize | Shadows;
export declare const Tokens: {
    colors: {
        purple: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
        };
        'medium-red-violet': {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
        };
        citron: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
        };
        white: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
        };
        'dark-bg': {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
            text: string;
        };
        secondary: {
            '50': string;
            '100': string;
            '200': string;
            '300': string;
            '400': string;
            '500': string;
            '600': string;
            '700': string;
            '800': string;
            '900': string;
            base: string;
        };
    };
    fontSizes: {
        sm: string;
        md: string;
        lg: string;
        xlg: string;
    };
    fontWeights: {
        light: string;
        normal: string;
        bold: string;
    };
    lineHeights: {
        short: string;
        normal: string;
        tall: string;
    };
    boxShadows: {
        sm: string;
        md: string;
        lg: string;
        xlg: string;
    };
};
