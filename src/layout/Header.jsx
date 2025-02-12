import style from "../style";
import PolicyEngineLogo from "../images/logos/policyengine/white.png";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ResponsiveComponent from "./ResponsiveComponent";
import SocialLinks from "./SocialLinks";
import CountrySelector from "./CountrySelector";

export const HEADER_HEIGHT = 75;

export function TopLeftLogo(props) {
  const { countryId } = props;
  const navigate = useNavigate();
  return (
    <img
      src={PolicyEngineLogo}
      alt="PolicyEngine logo"
      style={{
        cursor: "pointer",
      }}
      height="100%"
      onClick={() => navigate(`/${countryId}`)}
    />
  );
}

function MobileHeader(props) {
  // The top header bar, with the logo, search bar and social links
  const { countryId, loading } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: style.colors.BLUE,
          height: HEADER_HEIGHT,
          position: "fixed",
          width: "100%",
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <TopLeftLogo countryId={countryId} />
          {loading && (
            <div
              style={{
                paddingLeft: 20,
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Spinner style={{ color: "white", fontSize: 30 }} />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "fixed",
          right: 20,
          marginLeft: "auto",
          marginTop: 27.5,
          zIndex: 200,
        }}
      >
        <CountrySelector countryId={countryId} />
      </div>
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
}

function DesktopHeader(props) {
  // The top header bar, with the logo, search bar and social links
  const { countryId, loading } = props;

  const links = [
    `/${countryId}/about`,
    "mailto:hello@policyengine.org",
    `/${countryId}/donate`,
  ];
  const labels = [
    "About",
    "Contact",
    "Donate",
  ];
  return (
    <>
      <div
        style={{
          backgroundColor: style.colors.BLUE,
          height: HEADER_HEIGHT,
          paddingLeft: 10,
          position: "fixed",
          width: "100%",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TopLeftLogo countryId={countryId} />
        {loading && (
          <div
            style={{
              paddingLeft: 20,
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Spinner style={{ color: "white", fontSize: 30 }} />
          </div>
        )}
        {links.map((link, i) => (
          <a
            key={i}
            href={link}
            style={{
              color: "white",
              marginLeft: 20,
              marginRight: 20,
              textDecoration: "none",
              fontSize: 20,
            }}
          >
            {labels[i]}
          </a>
        ))}
        <div style={{ marginLeft: "auto", marginRight: 20 }}>
          <div
            style={{
              display: "flex",
            }}
          >
            <CountrySelector countryId={countryId} />
            <SocialLinks color="white" />
          </div>
        </div>
      </div>
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
}

export default function Header(props) {
  return (
    <ResponsiveComponent
      mobile={<MobileHeader {...props} />}
      desktop={<DesktopHeader {...props} />}
    />
  );
}
