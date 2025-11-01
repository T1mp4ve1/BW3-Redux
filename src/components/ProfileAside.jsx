import { useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProfile } from "../redux/allProfiles";
import { useNavigate } from "react-router";

export const ProfileAside = () => {
  const navigate = useNavigate();

  const handleHideToggle = (userIdFunc) => {
    navigate(`/profile/${userIdFunc}`);
  };
  const dispatch = useDispatch();
  const {
    data: allProfile,
    loading,
    error,
  } = useSelector((state) => state.allProfiles);

  useEffect(() => {
    dispatch(fetchAllProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <Spinner animation="border" variant="primary" className="text-center" />
    );
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  const filteredUsers = allProfile?.filter(
    (user) =>
      user.image !==
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
  );

  return (
    <>
      <Card className="p-3 mb-2">
        <div>
          <div className="d-flex justify-content-between">
            <h6
              style={{
                fontSize: 16,
              }}
            >
              Lingua del profilo
            </h6>
            <i className="bi bi-pencil"></i>
          </div>
          <p
            className="text-muted m-0"
            style={{
              fontSize: 14,
            }}
          >
            Italiano
          </p>
        </div>
        <hr className="text-muted" />
        <div>
          <div className="d-flex justify-content-between">
            <h6
              style={{
                fontSize: 16,
              }}
            >
              Profilo pubblico e URL
            </h6>
            <i className="bi bi-pencil"></i>
          </div>
          <p
            className="text-muted m-0"
            style={{
              fontSize: 14,
            }}
          >
            www.linkedin.com/in/pavel-timofeev-2bb5b938b
          </p>
        </div>
      </Card>

      <Card className="mb-2">
        <Card.Img src="https://media.licdn.com/media/AAYABATPAAgAAQAAAAAAAKwYrfHUPkoBQGmwnaG71Ps_5Q.png" />
      </Card>

      <Card className="p-3 mb-2">
        <h6
          className="m-0"
          style={{
            fontSize: 16,
          }}
        >
          Persone che potresti conoscere
        </h6>
        <p
          className="text-muted"
          style={{
            fontSize: 14,
          }}
        >
          Dalla tua scuola o università
        </p>

        {/* profiles */}
        {filteredUsers &&
          filteredUsers.slice(-10).map((user) => {
            return (
              <div key={user._id} className="d-flex border-bottom pb-3 mb-3">
                <Card.Img
                  className="rounded-5 me-2"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  src={user.image}
                />
                <div>
                  <div>
                    <h6
                      className="m-0"
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {user.name} {user.surname}{" "}
                      <i className="bi bi-shield-check"></i>
                    </h6>
                    <p
                      style={{
                        fontSize: 14,
                      }}
                    >
                      Data Analyst | Python | SQL | Power BI | Mathematics
                    </p>
                  </div>
                  <button
                    onClick={() => handleHideToggle(user._id)}
                    variant="light"
                    className="rounded-5 fw-semibold customButtonGray px-3"
                  >
                    <i className="bi bi-person-plus-fill me-1"></i>Aggiungi
                  </button>
                </div>
              </div>
            );
          })}
      </Card>
    </>
  );
};
