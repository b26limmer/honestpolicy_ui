import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../../scss/carrier/toolsAndResources.module.scss';
import Paper from '../../utils/paper';

const ToolsAndResources = ({ name }) => {
  const tools = [
    {
      title: 'What to do after an accident',
      description:
        'Encompass provides a nice selection of tools and resources on its website, ranging from loan calculators to accident kits. Here are the highlights.',
      cta: 'Download Kit',
      url: 'https://google.com',
    },
    {
      title: 'Lease or purchaser calculator',
      description:
        'Encompass provides a nice selection of tools and resources on its website, ranging from loan calculators to accident kits. Here are the highlights.',
      cta: 'Compare Loan to Leas',
      url: 'https://google.com',
    },
    {
      title: 'Compare car loan calculator',
      description:
        'Encompass provides a nice selection of tools and resources on its website, ranging from loan calculators to accident kits. Here are the highlights.',
      cta: 'Compare Loan to Leas',
      url: 'https://google.com',
    },
  ];
  return (
    <Paper>
      <h2 className={styles.carrierTemplateTitle}>{name}</h2>
      <p className={styles.introductionText}>
        {name} provides a nice selection of tools and resources on its website, ranging
        from loan calculators to accident kits. Here are the highlights.
      </p>
      {tools.map((tool, idx) => (
        <div className={styles.toolContainer} key={idx}>
          <h4 className={styles.toolTitle}>{tool.title}</h4>
          <p className={styles.text}>{tool.description}</p>
          <a
            className={styles.ctaButton}
            href={tool.url}
            target="__blank"
            rel="noopener noreferrer"
            title={tool.cta}
          >
            {tool.cta}
          </a>
        </div>
      ))}
    </Paper>
  );
};

ToolsAndResources.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ToolsAndResources;
