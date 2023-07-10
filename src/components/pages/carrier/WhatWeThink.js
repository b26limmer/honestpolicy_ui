import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../utils/paper';
import * as styles from '../../scss/carrier/whatWeThink.module.scss';
import whatWeThinkImage from '../../../images/carrierTemplate/friends-look-on-laptop_1_.png';

const WhatWeThink = ({ name }) => {
  const text = `
  ${name} is not a discount carrier, but it does offer some unique and customizable coverage options that are rich in value. The carrier's sweet spot is bundled home and auto coverage, called ${name}One. ${name}One is interesting because it covers your car and home with a single premium and a single deductible. It's available in one of three levels: Special, Deluxe, and Elite. Deluxe and Elite include popular options like Accident Forgiveness and a property coverage limit equal to 200% of the home's value. 
<br/>
<br/>
You can also buy standalone homeowners and auto coverage from ${name}. We'd characterize the standalone homeowners coverage as premium, in that most coverage levels include high limits and upgraded features like jewelry and fur replacement. With other carriers, these would be optional add-ons. 
<br/>
<br/>
The auto insurance from ${name} is more customizable. You can add things like New Car Replacement, Gap Coverage, and Roadside Assistance to your standard liability, collision, and comprehensive insurance. And to manage the cost of your auto insurance, ${name} offers 13 different discounts. Those discounts range from the standard anti-lock brake and anti-theft device discounts to less common options like the "Future Effective Date." This reduces your premium for initiating a policy seven or more days before its effective date. 
<br/>
<br/>
Finally, ${name}, like Allstate, uses the agency-driven model. You can manage some of your policy online via the My${name} website, but you also have access to an agent who can answer questions and help you customize coverage or qualify for discounts. This is a plus if you like managing your policy over the phone, but a negative if you'd rather have more freedom to do everything online.
<br/>
<br/>
${name} auto insurance summary: The auto insurance rates won't be the cheapest in town, but you can customize your policy with value-rich upgrades. 
<br/>
<br/>
${name} homeowners insurance summary: ${name} does not offer bare-bones homeowners insurance. The standalone homeowners insurance has ample coverage limits and extra features built in.

  `;
  return (
    <Paper>
      <h2 className={styles.carrierTemplateTitle}>What we think about {name}</h2>
      <div className={styles.center}>
        <img
          loading="lazy"
          className={styles.whatWeThinkImage}
          src={whatWeThinkImage}
          alt="What we think image"
        />
        <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </Paper>
  );
};

WhatWeThink.propTypes = {
  name: PropTypes.string.isRequired,
};

export default WhatWeThink;
