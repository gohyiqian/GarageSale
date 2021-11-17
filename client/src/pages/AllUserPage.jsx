import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, userSelectors } from "../redux/userSlice";
import styled from "styled-components";

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: teal;
  color: white;
  padding: 15px;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  alignitems: center;
  justifycontent: space-between;
  margin: 10px;
`;

const AllUserPage = () => {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch();
  const allUsers = useSelector(userSelectors.selectAll);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then(({ results }) => {
        const users = results.map((user) => ({
          id: user.login.uuid,
          name: `${user.name.first}${user.name.last}`,
          image: user.picture.thumbnail,
        }));
        dispatch(actions.usersAddMany(users));
      });
  }, [dispatch]);

  // onClick Add a user
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.usersAddOne({
        id: String(Math.random()),
        name: newUserName,
        image: "https://placeimg.com/48/48/people",
      })
    );
    setNewUserName("");
  };

  return (
    <>
      <Title>
        Users:
        <form onSubmit={handleFormSubmit}>
          <input
            style={{ display: "inline" }}
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <input style={{ display: "inline" }} type="submit" value="Create" />
        </form>
      </Title>

      <div>
        {allUsers.map((user) => (
          <Container key={user.id}>
            <img src={user.image} alt="" />
            <input
              style={{ flex: "1", margin: "0 10px" }}
              value={user.name}
              onChange={(e) => {
                dispatch(
                  actions.userUpdate({
                    id: user.id,
                    changes: { name: e.target.value },
                  })
                );
              }}
            />
            <button
              style={{ marginBottom: 0 }}
              onClick={() => {
                dispatch(actions.userRemove(user.id));
              }}
            >
              delete
            </button>
          </Container>
        ))}
      </div>
    </>
  );
};

export default AllUserPage;
