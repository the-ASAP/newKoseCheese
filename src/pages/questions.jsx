import React from 'react';
import { Section } from 'components/layout/Section/Section';
import { Wrapper } from 'components/layout/Wrapper/Wrapper';
import { H1 } from 'components/layout/H1/H1';
import Accordion from 'components/common/Accordion/Accordion';
import Head from 'next/head';
import MockAPI from 'api/MockAPI';
import APIBitrix from 'api/APIBitrix';

const additionAccordionClasses = {
  triggerClass: 'trigger--main',
  contentClass: 'content--main'
};

const Questions = ({ questions, seo }) => {
  console.log(questions)
  return (
    <>
      <Head>
        <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
        <meta name="description" content={seo?.meta_description || `KO&CO`} />
        <title>{seo?.meta_title || `KO&CO`}</title>
      </Head>
      <Section>
        <Wrapper>
          <H1>Вопросы</H1>
          <div>
          {questions?.map(({ name, description, id }) => (
            <Accordion key={id} title={name} additionClasses={additionAccordionClasses} button>
              {description}
            </Accordion>
          ))}
        </div>
        </Wrapper>
      </Section>
    </>
  )
};

export default Questions;

export const getServerSideProps = async () => {
  const questions = await APIBitrix.get(`content/questions/categories/`)
  const seo = await APIBitrix.get(`seo/questions-page/`);

  return {
    props: { questions, seo }
  };
};
