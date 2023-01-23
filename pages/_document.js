import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png"></link>
                    <meta name="theme-color" content="#fff" />
                    <link href="https://fonts.googleapis.com/css2?family=Inconsolata:wdth,wght@75,500;100,500&family=Inter:wght@300&display=swap&family=Noto+Sans+JP:wght@300&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;