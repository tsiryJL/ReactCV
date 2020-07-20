import React, { memo } from 'react';

import cn from 'classnames';
import { createUseStyles, useTheme } from 'react-jss';

import { useMediaQuery } from '@material-ui/core';

import { ShareLinks } from './share_links/share_links';

import { ReactComponent as Logo } from '../../assets/icons/brands/logo.svg';
import { styles } from './footer_styles';

const useStyles = createUseStyles(styles);

const FooterComponent = () => {
    const classes = useStyles();
    const { screenSizes } = useTheme();

    const useSmallLayout = useMediaQuery(
        `(max-width: ${screenSizes.medium - (screenSizes.medium - screenSizes.small) / 2}px)`,
        { defaultMatches: true }
    );

    if (useSmallLayout) {
        return (
            <div className={cn(classes.container, useSmallLayout && classes.smallLayoutContainer)}>
                <div className={classes.wldLogoGithubLogoContainer}>
                    <a className={classes.logoLink} href="https://www.facebook.com/HelloSayna/" target="_blank" rel="noreferrer noopener">
                        <Logo className={classes.logo} />
                    </a>
                </div>
                <ShareLinks useSmallLayout />
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <a className={classes.logoLink} href="https://www.facebook.com/HelloSayna/" target="_blank" rel="noreferrer noopener">
                <Logo className={classes.logo} />
            </a>
            <ShareLinks />
        </div>
    );
};

export const Footer = memo(FooterComponent);
