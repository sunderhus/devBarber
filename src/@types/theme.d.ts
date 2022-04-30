import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryStrong: string;
            primaryLight: string;
            secondary: string;
            tertiary: string;
        };
    }
}