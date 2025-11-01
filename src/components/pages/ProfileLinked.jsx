import { Col, Row } from "react-bootstrap";
import { ProfileCenter } from "../ProfileCenter";
import { ProfileAside } from "../ProfileAside";
import "../css/ProfileLinked.css";
import { useParams } from "react-router";

export const ProfileLinked = () => {
  const { userId } = useParams();

  return (
    <>
      <Row>
        <Col xs={9}>
          <ProfileCenter userIdParam={userId} />
        </Col>
        <Col xs={3}>
          <ProfileAside />
        </Col>
      </Row>
    </>
  );
};
