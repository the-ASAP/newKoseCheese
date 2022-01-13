import React from 'react';
import { MainSection } from 'components/sections/control/MainSection';
import Head from 'next/head';

const Control = ({seo}) => {
    return (
        <>
            <Head>
                <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
                <meta name="description" content={seo?.meta_description || `KO&CO`} />
                <title>{seo?.meta_title || `KO&CO`}</title>
            </Head>
            <MainSection />
        </>
    )
}

export default Control