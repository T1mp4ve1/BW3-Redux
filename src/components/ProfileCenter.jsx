import { useEffect } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherUser } from "../redux/otherUserSlice";
import { fetchExp } from "../redux/experiences";

export const ProfileCenter = ({ userIdParam }) => {
  const dispatch = useDispatch();
  // profile
  const {
    data: userProfile,
    loading,
    error,
  } = useSelector((state) => state.otherProfile);

  // exp
  const { data: userExp } = useSelector((state) => state.myExp);

  useEffect(() => {
    dispatch(fetchExp(userIdParam));
    dispatch(fetchOtherUser(userIdParam));
  }, [dispatch, userIdParam]);

  if (loading)
    return (
      <Spinner animation="border" variant="primary" className="text-center" />
    );

  if (error) return <p>Errore: {error}</p>;
  return (
    <>
      {/* profile */}
      <Card className="mb-2">
        <Card.Img
          variant="top"
          src="https://wallpapers.com/images/featured/sfondo-hd-bianco-65hm9z7go91ouhs5.jpg"
          alt="image"
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Body>
          <div className="position-relative">
            <img
              className="imageAbsolute"
              src={userProfile?.image}
              alt="image"
            />
            <div className="d-flex justify-content-end mb-2">
              <button className="penAbsolute rounded-5 border-0 fs-4">
                <i className="bi bi-pencil"></i>
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="m-0">
                  {userProfile?.name} {userProfile?.surname}{" "}
                  <span>
                    <i className="bi bi-shield-check"></i>
                  </span>
                </h4>
                <p className="mb-1">{userProfile?.title}</p>
              </div>
              <p className="fw-semibold w-25">
                <span>
                  <i className="bi bi-buildings me-1"></i>
                </span>
                EPICODE Institute of Technology
              </p>
            </div>
          </div>

          <p
            className="text-muted"
            style={{
              fontSize: 14,
            }}
          >
            {userProfile?.area}{" "}
            <span>
              ·{" "}
              <a className="fw-semibold linkUnderline" href="#">
                Informazioni di contatto
              </a>
            </span>
          </p>
          <div>
            <Button
              variant="primary"
              className="rounded-5 fw-semibold me-2 py-1 px-3"
            >
              Disponibile per
            </Button>
            <button
              variant="outline-primary"
              className="rounded-5 fw-semibold me-2 py-1 px-3 customButton"
            >
              Aggiungi sezione del profilo
            </button>
            <button className="rounded-5 fw-semibold me-2 py-1 px-3 customButton">
              Migliora profilo
            </button>
            <button className="rounded-5 fw-semibold py-1 px-3 customButtonGray">
              Risorse
            </button>
          </div>
        </Card.Body>
      </Card>

      {/* experience */}
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0">Esperienze</h5>
            <div>
              <button className="penAbsolute rounded-5 border-0 fs-4">
                <i className="bi bi-plus-lg"></i>
              </button>
              <button className="penAbsolute rounded-5 border-0 fs-4">
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          </div>

          <Container>
            <Row xs={3} className="d-flex">
              {userExp &&
                userExp.map((exp) => (
                  <Col key={exp._id} className="d-flex">
                    <i className="bi bi-buildings me-2 fs-3"></i>
                    <div>
                      <h6 className="m-0">{exp.role}</h6>
                      <p
                        className="m-0"
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {exp.company}
                      </p>
                      <p
                        className="text-muted m-0"
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {new Date(exp.startDate).toLocaleDateString("it-IT", {
                          year: "numeric",
                          month: "short",
                        })}{" "}
                        -{" "}
                        {new Date(exp.endDate).toLocaleDateString("it-IT", {
                          year: "numeric",
                          month: "short",
                        })}
                      </p>
                      <p
                        className="text-muted m-0"
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {exp.area}
                      </p>
                    </div>
                  </Col>
                ))}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};
