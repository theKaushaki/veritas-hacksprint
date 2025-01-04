import ContentLoader from "react-content-loader"

export const StreakLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={"auto"}
        backgroundColor="white"
        foregroundColor="rgba(87, 86, 179, 0.2)"
        gradientRatio={2}
        {...props}
    >
        <rect x="23" y="20" rx="0" ry="0" width="400" height="20" />
        <rect x="25" y="60" rx="0" ry="0" width="400" height="20" />
        <rect x="25" y="100" rx="0" ry="0" width="400" height="20" />
        <rect x="25" y="140" rx="0" ry="0" width="400" height="20" />
        <rect x="25" y="180" rx="0" ry="0" width="400" height="20" />
        <rect x="25" y="220" rx="0" ry="0" width="400" height="20" />
    </ContentLoader>
)



export const ImageLoader = (props) => (
    <ContentLoader
        speed={2}
        width={700}
        height={"auto"}
        backgroundColor="white"
        foregroundColor="rgba(87, 86, 179, 0.2)"
        gradientRatio={2}
        style={{position: 'absolute'}}
        {...props}
    >
        <rect x="23" y="0" rx="0" ry="0" width="850" height="30" />
        <rect x="25" y="60" rx="0" ry="0" width="850" height="30" />
        <rect x="25" y="120" rx="0" ry="0" width="850" height="30" />
        <rect x="25" y="180" rx="0" ry="0" width="850" height="30" />
        <rect x="25" y="240" rx="0" ry="0" width="850" height="30" />
        <rect x="25" y="300" rx="0" ry="0" width="850" height="30" />
    </ContentLoader>
)




export const LevelLoader = (props) => (
    <ContentLoader
        speed={2}
        width={400}
        height={"auto"}
        backgroundColor="white"
        foregroundColor="rgba(87, 86, 179, 0.2)"
        gradientRatio={2}
        {...props}
    >
        <rect x="23" y="20" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="60" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="100" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="140" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="180" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="220" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="260" rx="0" ry="0" width="400" height="25" />
        <rect x="25" y="300" rx="0" ry="0" width="400" height="25" />
    </ContentLoader>
)