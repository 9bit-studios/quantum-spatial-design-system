/**
 * COMPREHENSIVE FOUNDATION TOKENS
 * Ideal settings for spacing, design, grids, and layout
 * Based on your existing Apple HIG + Quantum Spatial tokens
 */
export declare const foundationpacing: {
    base: number;
    px: string;
    micro: string;
    tiny: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    xxxl: string;
    xxxxl: string;
    xxxxxl: string;
    component: {
        touchTarget: string;
        touchTargetLarge: string;
        navHeight: string;
        navHeightMobile: string;
        navPadding: string;
        contentPadding: string;
        sectionGap: string;
        cardPadding: string;
        cardGap: string;
        inputHeight: string;
        inputPadding: string;
        formGap: string;
        buttonPadding: string;
        sidebarWidth: string;
        sidebarPadding: string;
        contentMaxWidth: string;
        containerPadding: string;
    };
};
export declare const foundationGrid: {
    breakpoints: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    containers: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    columns: {
        mobile: number;
        tablet: number;
        desktop: number;
    };
    gutters: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    margins: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    quantum: {
        background: {
            opacity: number;
            lineColor: string;
            lineWidth: string;
            cellSize: string;
            perspective: string;
        };
        interface: {
            opacity: number;
            lineColor: string;
            lineWidth: string;
            cellSize: string;
            perspective: string;
        };
        feature: {
            opacity: number;
            lineColor: string;
            lineWidth: string;
            cellSize: string;
            perspective: string;
        };
    };
};
export declare const foundationLayout: {
    patterns: {
        navigation: {
            height: string;
            mobileHeight: string;
            zIndex: number;
            backdropFilter: string;
            background: string;
            borderBottom: string;
        };
        sidebar: {
            width: string;
            mobileWidth: string;
            zIndex: number;
            background: string;
            backdropFilter: string;
            borderRight: string;
        };
        content: {
            maxWidth: string;
            padding: string;
            mobilePadding: string;
            tabletPadding: string;
        };
        card: {
            borderRadius: string;
            padding: string;
            background: string;
            backdropFilter: string;
            border: string;
            boxShadow: string;
        };
        modal: {
            maxWidth: string;
            padding: string;
            borderRadius: string;
            zIndex: number;
            background: string;
            backdropFilter: string;
            border: string;
            boxShadow: string;
        };
    };
    zIndex: {
        background: number;
        base: number;
        above: number;
        overlay: number;
        dropdown: number;
        sticky: number;
        header: number;
        modal: number;
        popover: number;
        tooltip: number;
        toast: number;
        loading: number;
        max: number;
    };
    compositions: {
        page: {
            display: string;
            flexDirection: string;
            minHeight: string;
            fontFamily: string;
        };
        main: {
            display: string;
            flex: number;
            maxWidth: string;
            margin: string;
            width: string;
        };
        flexRow: {
            display: string;
            flexDirection: string;
            alignItems: string;
        };
        flexColumn: {
            display: string;
            flexDirection: string;
        };
        flexCenter: {
            display: string;
            alignItems: string;
            justifyContent: string;
        };
        gridAuto: {
            display: string;
            gridTemplateColumns: string;
            gap: string;
        };
        gridFixed: {
            display: string;
            gridTemplateColumns: string;
            gap: string;
        };
    };
};
export declare const foundationDesign: {
    hierarchy: {
        content: {
            h1: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            h2: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            h3: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            h4: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            h5: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            h6: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            body: {
                size: string;
                weight: string;
                lineHeight: string;
                letterSpacing: string;
            };
            caption: {
                size: string;
                weight: string;
                lineHeight: string;
            };
        };
        interface: {
            largeTitle: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            title1: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            title2: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            title3: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            headline: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            body: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            callout: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            subheadline: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            footnote: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            caption1: {
                size: string;
                weight: string;
                lineHeight: string;
            };
            caption2: {
                size: string;
                weight: string;
                lineHeight: string;
            };
        };
    };
    rhythm: {
        ratios: {
            tight: number;
            normal: number;
            relaxed: number;
            loose: number;
        };
        sections: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        components: {
            related: string;
            unrelated: string;
            sections: string;
            features: string;
        };
    };
    states: {
        default: {
            opacity: number;
            transform: string;
        };
        hover: {
            opacity: number;
            transform: string;
        };
        active: {
            opacity: number;
            transform: string;
        };
        disabled: {
            opacity: number;
            transform: string;
        };
        loading: {
            opacity: number;
            transform: string;
        };
        focus: {
            outline: string;
            outlineOffset: string;
            borderRadius: string;
        };
        quantum: {
            materialized: {
                opacity: number;
                filter: string;
                scale: number;
            };
            transitional: {
                opacity: number;
                filter: string;
                scale: number;
            };
            energy: {
                opacity: number;
                filter: string;
                scale: number;
            };
            superposition: {
                opacity: number;
                filter: string;
                scale: number;
            };
        };
    };
    elevation: {
        flat: {
            boxShadow: string;
            zIndex: number;
        };
        raised: {
            boxShadow: string;
            zIndex: number;
        };
        floating: {
            boxShadow: string;
            zIndex: number;
        };
        overlay: {
            boxShadow: string;
            zIndex: number;
        };
        modal: {
            boxShadow: string;
            zIndex: number;
        };
        glass: {
            subtle: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
            medium: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
            prominent: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
        };
    };
};
export declare const foundationResponsive: {
    mediaQueries: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        maxSm: string;
        maxMd: string;
        maxLg: string;
        maxXl: string;
        maxXxl: string;
        portrait: string;
        landscape: string;
        mobile: string;
        tablet: string;
        desktop: string;
        iPhone: string;
        iPad: string;
        macBook: string;
        reducedMotion: string;
        darkMode: string;
        lightMode: string;
    };
    patterns: {
        container: {
            width: string;
            maxWidth: string;
            margin: string;
            padding: string;
            '@media (min-width: 744px)': {
                padding: string;
            };
            '@media (min-width: 1024px)': {
                padding: string;
            };
        };
        gridResponsive: {
            display: string;
            gridTemplateColumns: string;
            gap: string;
            '@media (min-width: 744px)': {
                gridTemplateColumns: string;
                gap: string;
            };
            '@media (min-width: 1024px)': {
                gridTemplateColumns: string;
                gap: string;
            };
        };
        responsiveText: {
            fontSize: string;
            lineHeight: number;
        };
        responsiveSpacing: {
            padding: string;
            '@media (min-width: 744px)': {
                padding: string;
            };
            '@media (min-width: 1024px)': {
                padding: string;
            };
        };
    };
};
export declare const foundationTokens: {
    spacing: {
        base: number;
        px: string;
        micro: string;
        tiny: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
        component: {
            touchTarget: string;
            touchTargetLarge: string;
            navHeight: string;
            navHeightMobile: string;
            navPadding: string;
            contentPadding: string;
            sectionGap: string;
            cardPadding: string;
            cardGap: string;
            inputHeight: string;
            inputPadding: string;
            formGap: string;
            buttonPadding: string;
            sidebarWidth: string;
            sidebarPadding: string;
            contentMaxWidth: string;
            containerPadding: string;
        };
    };
    grid: {
        breakpoints: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
            xxxxl: string;
            xxxxxl: string;
        };
        containers: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
            xxxxl: string;
            xxxxxl: string;
        };
        columns: {
            mobile: number;
            tablet: number;
            desktop: number;
        };
        gutters: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
            xxxxl: string;
            xxxxxl: string;
        };
        margins: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
            xxxxl: string;
            xxxxxl: string;
        };
        quantum: {
            background: {
                opacity: number;
                lineColor: string;
                lineWidth: string;
                cellSize: string;
                perspective: string;
            };
            interface: {
                opacity: number;
                lineColor: string;
                lineWidth: string;
                cellSize: string;
                perspective: string;
            };
            feature: {
                opacity: number;
                lineColor: string;
                lineWidth: string;
                cellSize: string;
                perspective: string;
            };
        };
    };
    layout: {
        patterns: {
            navigation: {
                height: string;
                mobileHeight: string;
                zIndex: number;
                backdropFilter: string;
                background: string;
                borderBottom: string;
            };
            sidebar: {
                width: string;
                mobileWidth: string;
                zIndex: number;
                background: string;
                backdropFilter: string;
                borderRight: string;
            };
            content: {
                maxWidth: string;
                padding: string;
                mobilePadding: string;
                tabletPadding: string;
            };
            card: {
                borderRadius: string;
                padding: string;
                background: string;
                backdropFilter: string;
                border: string;
                boxShadow: string;
            };
            modal: {
                maxWidth: string;
                padding: string;
                borderRadius: string;
                zIndex: number;
                background: string;
                backdropFilter: string;
                border: string;
                boxShadow: string;
            };
        };
        zIndex: {
            background: number;
            base: number;
            above: number;
            overlay: number;
            dropdown: number;
            sticky: number;
            header: number;
            modal: number;
            popover: number;
            tooltip: number;
            toast: number;
            loading: number;
            max: number;
        };
        compositions: {
            page: {
                display: string;
                flexDirection: string;
                minHeight: string;
                fontFamily: string;
            };
            main: {
                display: string;
                flex: number;
                maxWidth: string;
                margin: string;
                width: string;
            };
            flexRow: {
                display: string;
                flexDirection: string;
                alignItems: string;
            };
            flexColumn: {
                display: string;
                flexDirection: string;
            };
            flexCenter: {
                display: string;
                alignItems: string;
                justifyContent: string;
            };
            gridAuto: {
                display: string;
                gridTemplateColumns: string;
                gap: string;
            };
            gridFixed: {
                display: string;
                gridTemplateColumns: string;
                gap: string;
            };
        };
    };
    design: {
        hierarchy: {
            content: {
                h1: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                h2: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                h3: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                h4: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                h5: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                h6: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                body: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                    letterSpacing: string;
                };
                caption: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
            };
            interface: {
                largeTitle: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                title1: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                title2: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                title3: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                headline: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                body: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                callout: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                subheadline: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                footnote: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                caption1: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
                caption2: {
                    size: string;
                    weight: string;
                    lineHeight: string;
                };
            };
        };
        rhythm: {
            ratios: {
                tight: number;
                normal: number;
                relaxed: number;
                loose: number;
            };
            sections: {
                xs: string;
                sm: string;
                md: string;
                lg: string;
                xl: string;
            };
            components: {
                related: string;
                unrelated: string;
                sections: string;
                features: string;
            };
        };
        states: {
            default: {
                opacity: number;
                transform: string;
            };
            hover: {
                opacity: number;
                transform: string;
            };
            active: {
                opacity: number;
                transform: string;
            };
            disabled: {
                opacity: number;
                transform: string;
            };
            loading: {
                opacity: number;
                transform: string;
            };
            focus: {
                outline: string;
                outlineOffset: string;
                borderRadius: string;
            };
            quantum: {
                materialized: {
                    opacity: number;
                    filter: string;
                    scale: number;
                };
                transitional: {
                    opacity: number;
                    filter: string;
                    scale: number;
                };
                energy: {
                    opacity: number;
                    filter: string;
                    scale: number;
                };
                superposition: {
                    opacity: number;
                    filter: string;
                    scale: number;
                };
            };
        };
        elevation: {
            flat: {
                boxShadow: string;
                zIndex: number;
            };
            raised: {
                boxShadow: string;
                zIndex: number;
            };
            floating: {
                boxShadow: string;
                zIndex: number;
            };
            overlay: {
                boxShadow: string;
                zIndex: number;
            };
            modal: {
                boxShadow: string;
                zIndex: number;
            };
            glass: {
                subtle: {
                    background: string;
                    backdropFilter: string;
                    boxShadow: string;
                };
                medium: {
                    background: string;
                    backdropFilter: string;
                    boxShadow: string;
                };
                prominent: {
                    background: string;
                    backdropFilter: string;
                    boxShadow: string;
                };
            };
        };
    };
    responsive: {
        mediaQueries: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
            xxl: string;
            xxxl: string;
            xxxxl: string;
            maxSm: string;
            maxMd: string;
            maxLg: string;
            maxXl: string;
            maxXxl: string;
            portrait: string;
            landscape: string;
            mobile: string;
            tablet: string;
            desktop: string;
            iPhone: string;
            iPad: string;
            macBook: string;
            reducedMotion: string;
            darkMode: string;
            lightMode: string;
        };
        patterns: {
            container: {
                width: string;
                maxWidth: string;
                margin: string;
                padding: string;
                '@media (min-width: 744px)': {
                    padding: string;
                };
                '@media (min-width: 1024px)': {
                    padding: string;
                };
            };
            gridResponsive: {
                display: string;
                gridTemplateColumns: string;
                gap: string;
                '@media (min-width: 744px)': {
                    gridTemplateColumns: string;
                    gap: string;
                };
                '@media (min-width: 1024px)': {
                    gridTemplateColumns: string;
                    gap: string;
                };
            };
            responsiveText: {
                fontSize: string;
                lineHeight: number;
            };
            responsiveSpacing: {
                padding: string;
                '@media (min-width: 744px)': {
                    padding: string;
                };
                '@media (min-width: 1024px)': {
                    padding: string;
                };
            };
        };
    };
    breakpoints: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    containers: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        xxxxxl: string;
    };
    zIndex: {
        background: number;
        base: number;
        above: number;
        overlay: number;
        dropdown: number;
        sticky: number;
        header: number;
        modal: number;
        popover: number;
        tooltip: number;
        toast: number;
        loading: number;
        max: number;
    };
    elevation: {
        flat: {
            boxShadow: string;
            zIndex: number;
        };
        raised: {
            boxShadow: string;
            zIndex: number;
        };
        floating: {
            boxShadow: string;
            zIndex: number;
        };
        overlay: {
            boxShadow: string;
            zIndex: number;
        };
        modal: {
            boxShadow: string;
            zIndex: number;
        };
        glass: {
            subtle: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
            medium: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
            prominent: {
                background: string;
                backdropFilter: string;
                boxShadow: string;
            };
        };
    };
    mediaQueries: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
        xxxxl: string;
        maxSm: string;
        maxMd: string;
        maxLg: string;
        maxXl: string;
        maxXxl: string;
        portrait: string;
        landscape: string;
        mobile: string;
        tablet: string;
        desktop: string;
        iPhone: string;
        iPad: string;
        macBook: string;
        reducedMotion: string;
        darkMode: string;
        lightMode: string;
    };
    utils: {
        getSpacing: (key: keyof typeof foundationpacing) => string | number | {
            touchTarget: string;
            touchTargetLarge: string;
            navHeight: string;
            navHeightMobile: string;
            navPadding: string;
            contentPadding: string;
            sectionGap: string;
            cardPadding: string;
            cardGap: string;
            inputHeight: string;
            inputPadding: string;
            formGap: string;
            buttonPadding: string;
            sidebarWidth: string;
            sidebarPadding: string;
            contentMaxWidth: string;
            containerPadding: string;
        };
        getBreakpoint: (key: keyof typeof foundationGrid.breakpoints) => string;
        getContainer: (key: keyof typeof foundationGrid.containers) => string;
        getZIndex: (key: keyof typeof foundationLayout.zIndex) => number;
        getResponsiveSpacing: (mobile: string, tablet?: string, desktop?: string) => {
            '@media (min-width: 1024px)'?: {
                padding: string;
            };
            '@media (min-width: 744px)'?: {
                padding: string;
            };
            padding: string;
        };
        getResponsiveGrid: (mobile: number, tablet?: number, desktop?: number) => {
            '@media (min-width: 1024px)'?: {
                gridTemplateColumns: string;
                gap: string;
            };
            '@media (min-width: 744px)'?: {
                gridTemplateColumns: string;
                gap: string;
            };
            display: string;
            gridTemplateColumns: string;
            gap: string;
        };
    };
};
export type FoundationTokens = typeof foundationTokens;
export type foundationpacing = typeof foundationpacing;
export type FoundationGrid = typeof foundationGrid;
export type FoundationLayout = typeof foundationLayout;
export type FoundationDesign = typeof foundationDesign;
export type FoundationResponsive = typeof foundationResponsive;
export default foundationTokens;
//# sourceMappingURL=comprehensive-foundation-tokens.d.ts.map