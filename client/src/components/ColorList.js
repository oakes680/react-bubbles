import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log("edddddit", colorToEdit.id);
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        axiosWithAuth()
          .get(`/api/colors`)
          .then(res => {
            updateColors(res.data);
          });
      });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log("deleteeeeee", color.id);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get(`/api/colors`)
          .then(res => {
            updateColors(res.data);
          });
      });
  };

  const [addColor, setAddColor] = useState({
    color: "",
    code: { hex: "" }
  });

  const addColorSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors`, addColor)
      .then(res => {
        setAddColor({
          color: "",
          code: { hex: "" }
        });
        axiosWithAuth()
          .get(`/api/colors`)
          .then(res => {
            updateColors(res.data);
          });
      });
  };

  const addColorChanges = e => {
    setAddColor({
      ...addColor,
      [e.target.name]: e.target.value
    });
  };

  const addHexChanges = e => {
    // console.log(addColor);
    setAddColor({
      ...addColor,
      [e.target.name]: { hex: e.target.value }
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColorSubmit}>
        <input
          type="text"
          name="color"
          placeholder="color name"
          onChange={addColorChanges}
          value={addColor.color}
        />
        <input
          type="text"
          name="code"
          placeholder="hex"
          onChange={addHexChanges}
          value={addColor.code.hex}
        />

        <button>ADD A NEW COLOR</button>
      </form>
    </div>
  );
};

export default ColorList;
