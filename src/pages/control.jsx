import React from 'react';
import { MainSection } from 'components/sections/control/MainSection';
import Head from 'next/head';
import APIBitrix from 'api/APIBitrix';

const Control = ({content, seo}) => {
    return (
        <>
            <Head>
                <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
                <meta name="description" content={seo?.meta_description || `KO&CO`} />
                <title>{seo?.meta_title || `KO&CO`}</title>
            </Head>
            <MainSection content={content}/>
        </>
    )
}

export default Control

export const getServerSideProps = async () => {
    const content = await APIBitrix.get(`content/quality-control/`).then(res => res);

    return { props: { content } };
  };