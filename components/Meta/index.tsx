import Head from 'next/head';

export default function Meta({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {/* <meta property="og:url" content="" />
      <meta property="og:image" content="" /> */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}
