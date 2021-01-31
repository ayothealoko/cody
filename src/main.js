// @flow
import React, { useState } from "react";
import type { Element } from "react";
import { render } from "react-dom";
import "./style.css";

type AppState = {
  route: Routes,
  entry: EntryState,
  js: JsState,
  styles: StylesState,
  images: ImagesState,
  fonts: FontsState,
  output: OutputState,
};

type Entries = { name: string, file: string };
type EntryState = {
  current: Entries,
  entries: Entries[],
  blink: number,
};
type JsState = {
  on: boolean,
  fileExt: string,
  jsVersion: JsLevel,
  HMR: boolean,
  blink: number,
  jsx: boolean,
  sourceMaps: boolean,
};
type StylesState = {
  on: boolean,
  sass: boolean,
  fileExt: string,
  minify: boolean,
  blink: number,
    format: StylesFormat,
};

type StylesFormat = "inline" | "extracted";
type ImagesState = {
  on: boolean,
  fileExt: string,
  blink: number,
};
type FontsState = {
  on: boolean,
  fileExt: string,
  blink: number,
};
type OutputState = {
  output: string,
};

type RouteMsg = {| type: "routes", route: Routes, e: any |};

type EntryAddMsg = {| type: "entryAdd" |};
type EntryDeleteMsg = {| type: "entryDelete", id: number |};
type EntryNameStringMsg = {| type: "entryNameString", e: any |};
type EntryFileStringMsg = {| type: "entryFileString", e: any |};

type JsFileExtStringMsg = {| type: "jsFileExtString", e: any |};
type JsOnOffMsg = {| type: "jsOnOff", on: boolean |};
type JsHMROnOffMsg = {| type: "jsHMROnOff", on: boolean |};
type JsVersionMsg = {| type: "jsVersion", level: JsLevel |};
type JsJsxOnOffMsg = {| type: "jsJsxOnOff", on: boolean |};
type JsSourceMapsOnOffMsg = {| type: "jsSourceMapsOnOff", on: boolean |};

type StylesOnOffMsg = {| type: "stylesOnOff", on: boolean |};
type StylesFileExtStringMsg = {| type: "stylesFileExtString", e: any |};
type StylesSassOnOffMsg = {| type: "stylesSassOnOff", on: boolean |};
type StylesMinifyOnOffMsg = {| type: "stylesMinifyOnOff", on: boolean |};
type StylesSourceMapsOnOffMsg = {|
  type: "stylesSourceMapsOnOff",
  on: boolean,
|};
type StylesFormatMsg = {| type: "stylesFormat", format: StylesFormat |};

type ImagesOnOffMsg = {| type: "imagesOnOff", on: boolean |};
type ImagesFileExtStringMsg = {| type: "imagesFileExtString", e: any |};

type FontsOnOffMsg = {| type: "fontsOnOff", on: boolean |};
type FontsFileExtStringMsg = {| type: "fontsFileExtString", e: any |};

type BlinkEntryMsg = {| type: "blinkEntry", id: number |};
type BlinkJsMsg = {| type: "blinkJs", id: number |};
type BlinkStylesMsg = {| type: "blinkStyles", id: number |};
type BlinkImagesMsg = {| type: "blinkImages", id: number |};
type BlinkFontsMsg = {| type: "blinkFonts", id: number |};

type Message =
  | RouteMsg
  | EntryAddMsg
  | EntryDeleteMsg
  | EntryNameStringMsg
  | EntryFileStringMsg
  | JsFileExtStringMsg
  | JsOnOffMsg
  | JsHMROnOffMsg
  | JsVersionMsg
  | JsJsxOnOffMsg
  | JsSourceMapsOnOffMsg
  | StylesOnOffMsg
  | StylesFileExtStringMsg
  | StylesSassOnOffMsg
  | StylesMinifyOnOffMsg
  | StylesSourceMapsOnOffMsg
  | StylesFormatMsg
  | ImagesOnOffMsg
  | ImagesFileExtStringMsg
  | FontsOnOffMsg
  | FontsFileExtStringMsg
  | BlinkEntryMsg
  | BlinkJsMsg
  | BlinkStylesMsg
  | BlinkImagesMsg
  | BlinkFontsMsg;

// pipe is instantiated and call App.update when update is called
class Pipe {
  updater: (Message) => void;

  updateFunction(u: (Message) => void) {
    this.updater = u;
  }

  update(d: Message) {
    this.updater ? this.updater(d) : "";
  }

}

const pipe: Pipe = new Pipe();

type Routes =
  | "entry"
  | "js"
  | "styles"
  | "images"
  | "fonts"
  | "output";
type JsLevel = "es5" | "env";

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      route: "js",
      entry: {
        current: { file: "", name: "" },
        entries: [{ name: "index", file: "./src/index.js" }],
        blink: -1,
      },
      js: {
        on: true,
        fileExt: "/\\.(js|jsx)$/",
        jsVersion: "env",
        HMR: false,
        blink: -1,
        jsx: true,
        sourceMaps: true,
      },
      styles: {
        on: true,
        sass: true,
        fileExt: "/\\.(css|sass)$/",
        minify: false,
        blink: -1,
	  format: "inline",
      },
      images: {
        on: true,
        fileExt: "/\\.(png|jpg|jpeg)$/",
        blink: -1,
      },
      fonts: {
        on: true,
        fileExt: "/\\.(ttf|eot|woff|woff2)$/",
        blink: -1,
      },
      output: {
        output: "TODO",
      },
    };

    // Setup pipe
    pipe.updateFunction(this.update);
  }

  update = (msg: Message): void => {
    switch (msg.type) {
      case "routes":
        msg.e.preventDefault();

	switch (msg.route){
	case "js":
            this.setState((state) => ({
		route: msg.route,
		js:{
		    ...state.js,
		    blink: -1
		}
            }));
	break;
	case "styles":
            this.setState((state) => ({
		route: msg.route,
		styles:{
		    ...state.styles,
		    blink: -1
		}
            }));
	break;
	case "images":
            this.setState((state) => ({
		route: msg.route,
		images:{
		    ...state.images,
		    blink: -1
		}
            }));
	break;
	case "fonts":
            this.setState((state) => ({
		route: msg.route,
		fonts:{
		    ...state.fonts,
		    blink: -1
		}
            }));
	break;
	case "entry":
            this.setState((state) => ({
		route: msg.route,
		entry:{
		    ...state.entry,
		    blink: -1
		}
            }));
	break;
	// bug if new routes are added, then a case for their blink needs to be added here
	default:
	    this.setState((state) => ({
		route: msg.route,
		js:{
		    ...state.js,
		    blink: -1
		}
            }));
	}

        break;

      // entry
      case "entryAdd":
        this.setState((state) => {
          let arr = state.entry.entries;
          const current = state.entry.current;

          if (current.name === "" || current.file === "") {
            return {};
          } else {
            return {
              entry: {
                ...state.entry,
                entries: arr.concat(state.entry.current),
                current: { file: "", name: "" },
              },
            };
          }
        });
        break;

      case "entryDelete":
        this.setState((state) => {
          let arr = state.entry.entries;
          return {
            entry: {
              ...state.entry,
              entries: arr.filter((item, i) => i !== msg.id),
            },
          };
        });
        break;

      case "entryNameString":
        this.setState((state) => {
          return {
            entry: {
              ...state.entry,
              current: {
                name: msg.e.target.value,
                file: state.entry.current.file,
              },
            },
          };
        });
        break;

      case "entryFileString":
        this.setState((state) => {
          return {
            entry: {
              ...state.entry,
              current: {
                name: state.entry.current.name,
                file: msg.e.target.value,
              },
            },
          };
        });
        break;

      // Js
      case "jsOnOff":
        this.setState((state) => {
          return {
            js: {
              ...state.js,
              on: msg.on,
            },
          };
        });
        break;

      case "jsHMROnOff":
        this.setState((state) => {
          return {
            js: {
              ...state.js,
              HMR: msg.on,
            },
          };
        });
        break;

      case "jsFileExtString":
        this.setState((state) => {
          return {
            js: {
              ...state.js,
              fileExt: msg.e.target.value,
            },
          };
        });
        break;

      case "jsVersion":
        this.setState((state) => {
          return {
            js: {
              ...state.js,
              jsVersion: msg.level,
            },
          };
        });
        break;

      case "jsJsxOnOff":
        this.setState((state) => {
            return {
            js: {
              ...state.js,
              jsx: msg.on,
            },
            };
        });
        break;

      case "jsSourceMapsOnOff":
        this.setState((state) => {
            return {
		js: {
              ...state.js,
              sourceMaps: msg.on,
            },
            };
        });
        break;

      // styles
      case "stylesOnOff":
        this.setState((state) => {
          return {
            styles: {
              ...state.styles,
              on: msg.on,
            },
          };
        });
        break;

      case "stylesFileExtString":
        this.setState((state) => {
          return {
            styles: {
              ...state.styles,
              fileExt: msg.e.target.value,
            },
          };
        });
        break;

      case "stylesSassOnOff":
        this.setState((state) => {
          return {
            styles: {
              ...state.styles,
              sass: msg.on,
            },
          };
        });
        break;

      case "stylesMinifyOnOff":
        this.setState((state) => {
          return {
            styles: {
              ...state.styles,
              minify: msg.on,
            },
          };
        });
        break;

    case "stylesFormat":
	this.setState((state) => {
	    return {
		styles:{
		    ...state.styles,
		    format:msg.format,
		}
	    }
	})
	break;

      // images
      case "imagesOnOff":
        this.setState((state) => {
          return {
            images: {
              ...state.images,
              on: msg.on,
            },
          };
        });
        break;

      case "imagesFileExtString":
        this.setState((state) => {
          return {
            images: {
              ...state.images,
              fileExt: msg.e.target.value,
            },
          };
        });
        break;


      // fonts
      case "fontsOnOff":
        this.setState((state) => {
          return {
            fonts: {
              ...state.fonts,
              on: msg.on,
            },
          };
        });
        break;

      case "fontsFileExtString":
        this.setState((state) => {
          return {
            fonts: {
              ...state.fonts,
              fileExt: msg.e.target.value,
            },
          };
        });
        break;

      // blinks
      case "blinkEntry":
        this.setState((state) => {
          return {
            entry: {
              ...state.entry,
              blink: msg.id,
            },
            route: "entry",
          };
        });
        break;

      case "blinkJs":
        this.setState((state) => {
          return {
            js: {
              ...state.js,
              blink: msg.id,
            },
            route: "js"
          };
        });
        break;

      case "blinkStyles":
        this.setState((state) => {
          return {
            styles: {
              ...state.styles,
              blink: msg.id,
            },
            route: "styles",
          };
        });
        break;

      case "blinkImages":
        this.setState((state) => {
          return {
            images: {
              ...state.images,
              blink: msg.id,
            },
            route: "images",
          };
        });
        break;
      case "blinkFonts":
        this.setState((state) => {
          return {
            fonts: {
              ...state.fonts,
              blink: msg.id,
            },
            route: "fonts",
          };
        });
        break;
    }
  };

  render() {
    let active = (r: Routes) =>
      this.state.route === r ? " sidebar__link--active" : "";
    return (
      <div className="app">
        <div className="app__header">
          <h1>Cody</h1>
        </div>
        <div className="app__main">
          <div className="sidebar">
            <a
              className={"sidebar__link unlink" + active("entry")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "entry", e: e })
              }
            >
              entry
            </a>
            <a
              className={"sidebar__link unlink" + active("js")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "js", e: e })
              }
            >
              javascript
            </a>
            <a
              className={"sidebar__link unlink" + active("styles")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "styles", e: e })
              }
            >
              styles
            </a>
            <a
              className={"sidebar__link unlink" + active("images")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "images", e: e })
              }
            >
              images
            </a>
            <a
              className={"sidebar__link unlink" + active("fonts")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "fonts", e: e })
              }
            >
              fonts
            </a>
            <a
              className={"sidebar__link unlink" + active("output")}
              href="#"
              onClick={(e) =>
                pipe.update({ type: "routes", route: "output", e: e })
              }
            >
              output
            </a>
          </div>
          <main className="main">
            <Views
              route={this.state.route}
              appState={this.state}
              update={this.update}
            />
          </main>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

function Views(props: { appState: AppState, route: Routes }): Element<any> {
  let comp;

  switch (props.route) {
    case "entry":
      let entryState: EntryState = props.appState["entry"];
      comp = <EntryRoute appState={entryState} />;
      break;
    case "js":
      let jsState: JsState = props.appState["js"];
      comp = <JsRoute appState={jsState} />;
      break;
    case "styles":
      let stylesState: StylesState = props.appState["styles"];
      comp = <StylesRoute appState={stylesState} />;
      break;
    case "images":
      let imagesState: ImagesState = props.appState["images"];
      comp = <ImagesRoute appState={imagesState} />;
      break;
    case "fonts":
      let fontsState: FontsState = props.appState["fonts"];
      comp = <FontsRoute appState={fontsState} />;
      break;
    case "output":
      let appState: AppState = props.appState;
      comp = <OutputRoute appState={appState} />;
      break;
    default:
      comp = <span>Sorry, an error has occured. Please refresh the tab</span>;
  }

  return comp;
}

function OnOffButtons(props: {
  on: boolean,
  msgOn: Message,
  msgOff: Message,
}): Element<"div"> {
  // onclick should be on the item div to make it easy to click
  return (
    <div className="onoffbutton">
      {
        // ON
      }
      <div
        className="onoffbutton__item"
        onClick={() => pipe.update(props.msgOn)}
      >
        <div
          className={
            "onoffbutton__circle" + (props.on ? " onoffbutton--on" : "")
          }
        ></div>
        <span>On</span>
      </div>
      {
        // OFF
      }
      <div
        className="onoffbutton__item"
        onClick={() => pipe.update(props.msgOff)}
      >
        <div
          className={
            "onoffbutton__circle" + (props.on ? "" : " onoffbutton--off")
          }
        ></div>
        <span>Off</span>
      </div>
    </div>
  );
}

function TextTileBlocks(props: {
  name: string,
  text: string,
  msg: (e: any) => Message,
}): Element<"div"> {
  return (
    <div className="texttile">
      <span>{props.name}</span>
      <input
        className="texttile__input"
        type="text"
        value={props.text}
        onChange={(e) => pipe.update(props.msg(e))}
      />
    </div>
  );
}

function Tile(props: {
  name: string,
  block: Element<any>,
  blink: boolean,
}): Element<"div"> {
  return (
    <div className={props.blink ? "tile tile--blink" : "tile"}>
      <span className="tile--name">{props.name}</span>
      <div className="tile--block">{props.block}</div>
    </div>
  );
}

function Toggles(props: {
  items: string[],
  active: number,
  msg: (level: number) => Message,
}): Element<"div"> {
  // TODO sanitize Numbers so that they are non-negative integers
  let items = props.items;
  let active = props.active;
  // make sure items is at least 2 to toggle

  let final = <div></div>;
  if (items.length <= active || active < 0) {
    final = (
      <div>
        <span>No valid active</span>
      </div>
    );
  } else if (items.length >= 2) {
    final = (
      <div className="toggle">
        <>
          {items.map((s, i) => {
            return (
              <ActiveButtons
                name="toggle__item"
                content={s}
                active={active}
                index={i}
                length={items.length}
                msg={props.msg(i)}
              />
            );
          })}
        </>
      </div>
    );
  } else {
    let final = (
      <div>
        {" "}
        <span>add more items to div</span>
      </div>
    );
  }

  return final;
}

function AddButton(props: { msg: Message }): Element<"button"> {
  return (
    <button
      className="addbutton"
      onClick={() => {
        pipe.update(props.msg);
      }}
    >
      add
    </button>
  );
}

function EntryText(props: {
  fileStrMsg: (e: any) => Message,
  nameStrMsg: (e: any) => Message,
  current: Entries,
  buttonMsg: Message,
}): Element<"div"> {
  return (
    <div className="entrytext">
      <TextTileBlocks
        name="name"
        text={props.current.name}
        msg={props.nameStrMsg}
      />
      <TextTileBlocks
        name="file"
        text={props.current.file}
        msg={props.fileStrMsg}
      />
      <AddButton msg={props.buttonMsg} />
    </div>
  );
}

function DeleteButton(props: { msg: Message }): Element<"button"> {
  return (
    <button
      className="deletebutton"
      onClick={() => {
        pipe.update(props.msg);
      }}
    >
      delete
    </button>
  );
}

function ActiveButtons(props: {
  name: string,
  content: string,
  active: number,
  index: number,
  length: number,
  msg: Message,
}): Element<"button"> {
  // make the border things work
  let border =
    props.length === props.index + 1 ? "" : " " + props.name + "--border";

  if (props.active === props.index) {
    return (
      <button
        className={props.name + " " + props.name + "--active" + border}
        onClick={() => pipe.update(props.msg)}
      >
        {props.content}
      </button>
    );
  } else {
    return (
      <button
        className={props.name + border}
        onClick={() => pipe.update(props.msg)}
      >
        {props.content}
      </button>
    );
  }
}

function blinkBool(i: number, n: number): boolean {
  return i === n;
}

function EntryRoute(props: {
  appState: EntryState,
}): Element<typeof React.Fragment> {
  const appState = props.appState;

  let nameStrMsg = (e): EntryNameStringMsg => {
    return { type: "entryNameString", e: e };
  };

  let fileStrMsg = (e): EntryFileStringMsg => {
    return { type: "entryFileString", e: e };
  };

  const blink = props.appState.blink;

  let arrTile = appState.entries.map((item, i) => {
    let name = item.name + ": " + item.file;
    return (
      <Tile
        name={name}
        blink={blinkBool(blink, i + 1)}
        block={<DeleteButton msg={{ type: "entryDelete", id: i }} />}
      />
    );
  });

  return (
    <>
      <Tile
        name="entry"
        blink={blinkBool(blink, 0)}
        block={
          <EntryText
            nameStrMsg={nameStrMsg}
            fileStrMsg={fileStrMsg}
            buttonMsg={{ type: "entryAdd" }}
            current={appState.current}
          />
        }
      />

      <div className="tilecollection">{arrTile}</div>
    </>
  );
}

function JsRoute(props: { appState: JsState }): Element<typeof React.Fragment> {
  const appState = props.appState;

  let fileMsg = (e): JsFileExtStringMsg => {
    return { type: "jsFileExtString", e: e };
  };

  let jsVersionMsg = (level: number): JsVersionMsg => {
    let levels = ["es5", "env"];
    return { type: "jsVersion", level: levels[level] };
  };

  let jsVersionActive = (level: JsLevel): number => {
    let levels = ["es5", "env"];

    return levels.indexOf(level);
  };

  const blink = props.appState.blink;

  return (
    <>
      <Tile
        name="javascript"
        blink={blinkBool(blink, 0)}
        block={
          <OnOffButtons
            on={appState.on}
            msgOn={{ type: "jsOnOff", on: true }}
            msgOff={{ type: "jsOnOff", on: false }}
          />
        }
      />
      <div className="tilecollection">
        <Tile
          name="file extension"
          blink={blinkBool(blink, 1)}
          block={
            <TextTileBlocks
              name="regex:"
              text={appState.fileExt}
              msg={fileMsg}
            />
          }
        />
        <Tile
          name="Javascript version"
          blink={blinkBool(blink, 2)}
          block={
            <Toggles
              items={["Es5", "Env"]}
              active={jsVersionActive(appState.jsVersion)}
              msg={jsVersionMsg}
            />
          }
        />
	<Tile
          name="Jsx"
          blink={blinkBool(blink, 3)}
          block={
            <OnOffButtons
              on={appState.jsx}
              msgOn={{ type: "jsJsxOnOff", on: true }}
              msgOff={{ type: "jsJsxOnOff", on: false }}
            />

          }
        />
        <Tile
          name="Hot module replacement"
          blink={blinkBool(blink, 4)}
          block={
            <OnOffButtons
              on={appState.HMR}
              msgOn={{ type: "jsHMROnOff", on: true }}
              msgOff={{ type: "jsHMROnOff", on: false }}
            />
          }
        />
        <Tile
          name="source maps"
          blink={blinkBool(blink, 5)}
          block={
            <OnOffButtons
              on={appState.sourceMaps}
              msgOn={{ type: "jsSourceMapsOnOff", on: true }}
              msgOff={{ type: "jsSourceMapsOnOff", on: false }}
            />
	    }
	    />
      </div>
    </>
  );
}

function StylesRoute(props: {
  appState: StylesState,
}): Element<typeof React.Fragment> {
  let fileMsg = (e): StylesFileExtStringMsg => {
    return { type: "stylesFileExtString", e: e };
  };

 let stylesFormatActive = (level: StylesFormat): number => {
     let levels = ["inline", "extracted"];

    return levels.indexOf(level);
  };

  let stylesFormatMsg = (level: number): StylesFormatMsg => {
     let levels = ["inline", "extracted"];
    return { type: "stylesFormat", format: levels[level] };
  };


  const blink = props.appState.blink;

  return (
    <>
      <Tile
        name="style"
        blink={blinkBool(blink, 0)}
        block={
          <OnOffButtons
            on={props.appState.on}
            msgOn={{ type: "stylesOnOff", on: true }}
            msgOff={{ type: "stylesOnOff", on: false }}
          />
        }
      />
      <div className="tilecollection">
        <Tile
          name="sass"
          blink={blinkBool(blink, 1)}
          block={
            <OnOffButtons
              on={props.appState.sass}
              msgOn={{ type: "stylesSassOnOff", on: true }}
              msgOff={{ type: "stylesSassOnOff", on: false }}
            />
          }
        />
        <Tile
          name="file extension"
          blink={blinkBool(blink, 2)}
          block={
            <TextTileBlocks
              name="regex:"
              text={props.appState.fileExt}
              msg={fileMsg}
            />
          }
        />
        <Tile
          name="minify"
          blink={blinkBool(blink, 3)}
          block={
            <OnOffButtons
              on={props.appState.minify}
              msgOn={{ type: "stylesMinifyOnOff", on: true }}
              msgOff={{ type: "stylesMinifyOnOff", on: false }}
            />
          }
        />
	<Tile
          name="format"
          blink={blinkBool(blink, 4)}
          block={
            <Toggles
		  items={["inline", "extracted"]}
              active={stylesFormatActive(props.appState.format)}
              msg={stylesFormatMsg}
            />
          }
        />
      </div>
    </>
  );
}

function ImagesRoute(props: {
  appState: ImagesState,
}): Element<typeof React.Fragment> {
  let fileMsg = (e): ImagesFileExtStringMsg => {
    return { type: "imagesFileExtString", e: e };
  };

  const blink = props.appState.blink;

  return (
    <>
      <Tile
        name="images"
        blink={blinkBool(blink, 0)}
        block={
          <OnOffButtons
            on={props.appState.on}
            msgOn={{ type: "imagesOnOff", on: true }}
            msgOff={{ type: "imagesOnOff", on: false }}
          />
        }
      />
      <div className="tilecollection">
        <Tile
          name="file extension"
          blink={blinkBool(blink, 1)}
          block={
            <TextTileBlocks
              name="regex:"
              text={props.appState.fileExt}
              msg={fileMsg}
            />
          }
        />
      </div>
    </>
  );
}

function FontsRoute(props: {
  appState: FontsState,
}): Element<typeof React.Fragment> {
  let fileMsg = (e): FontsFileExtStringMsg => {
    return { type: "fontsFileExtString", e: e };
  };

  const blink = props.appState.blink;

  return (
    <>
      <Tile
        name="fonts"
        blink={blinkBool(blink, 0)}
        block={
          <OnOffButtons
            on={props.appState.on}
            msgOn={{ type: "fontsOnOff", on: true }}
            msgOff={{ type: "fontsOnOff", on: false }}
          />
        }
      />
      <div className="tilecollection">
        <Tile
          name="file extension"
          blink={blinkBool(blink, 1)}
          block={
            <TextTileBlocks
              name="regex:"
              text={props.appState.fileExt}
              msg={fileMsg}
            />
          }
        />
      </div>
    </>
  );
}

function OutputRoute(props: {
  appState: AppState,
}): Element<typeof React.Fragment> {
  return (
    <>
      <DependencyFile appState={props.appState} />
      <WebpackFile appState={props.appState} />
      <BabelFile appState={props.appState} />
    </>
  );
}

type LineLink = {| msg: Message, link: string |};
type LineString = {| str: string |};

type LineData = LineLink | LineString;
type LineArr = LineData[];

function Line(props: { lineNumber: number, lineContent:Element<any> }): Element<"div"> {
  return (
    <div className="line">
      <span className="line__number">{props.lineNumber}</span>
      {props.lineContent}
    </div>
  );
}

function LineContent(props:{line:LineArr, indent:number}): Element<"p">{
    let content = props.line.map((item) => {
          if (item.link) {
            return (
		<a className="line__link" href="#" onClick={() =>pipe.update(item.msg)}>
                {item.link}
              </a>
            );
          } else if (item.str) {
            return <span className="line__span">{item.str}</span>;
          }
    });
    // adds indents to lines
    content.unshift(<span style={{padding: `${props.indent * 0.5 }em`}} />);
    return (
      <p className="line__content">
        {content}
      </p>
    );    
}

// File should be the only palce line numbers are added
function File(props: { name: string, lineContent:Element<any>[] }): Element<"div"> {
  return (
    <div className="file">
      <h4 className="file__h4">{props.name}</h4>
      {props.lineContent.map((item, i) => {
        return <Line lineNumber={i + 1} lineContent={item} />
      })}
    </div>
  );
}

function WebpackFile(props: { appState: AppState }): Element<typeof File> {
    const appState = props.appState;
    let indent = 0;
  let finalLines: Element<any>[] = [];
    finalLines.push(<CommentLine indent={indent} str="use path to make keep consitency between operating systems" />);
    finalLines.push(<StringLine indent={indent} str='const path = require("path");' />);
    if(appState.styles.minify && appState.styles.on){
    finalLines.push(<CommentLine indent={indent} str="import plugin to minize css" />);
	finalLines.push(<LineContent indent={indent} line={[{link: 'const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");', msg:{type:"blinkStyles", id:3}}]} />);
    }
    // extract plugin
    if(appState.styles.format === "extracted" && appState.styles.on){
    finalLines.push(<CommentLine indent={indent} str="import plugin to exctract css to seprate files" />);
	finalLines.push(<LineContent indent={indent} line={[{link: 'const MiniCssExtractPlugin = require("mini-css-extract-plugin");', msg:{type:"blinkStyles", id:5}}]} />);
    }
    // blank space
    finalLines.push(<StringLine indent={indent} str='' />);
    finalLines.push(<StringLine indent={indent} str='module.exports = {' />);
    // Entry
    indent = 1;
    finalLines.push(<StringLine indent={indent} str='entry: {' />);
    indent = 2;
    let entries = appState.entry.entries.map((item, i) => {
	return (<LineContent indent={indent} line={[{link: `${item.name}: path.resolve(__dirname, ${item.file}),`, msg:{type:"blinkEntry", id:i+1}}]} />);
    });
    finalLines = finalLines.concat(entries);
    indent = 1;
    finalLines.push(<StringLine indent={indent} str='},' />);

    // module
    finalLines.push(<StringLine indent={indent} str='module: {' />);
    indent=2;
    finalLines.push(<StringLine indent={indent} str='rules: [' />);
    indent=3;
    // rule js
    if(appState.js.on){
    finalLines.push(<StringLine indent={indent} str='{' />);
    indent=4;
	finalLines.push(<LineContent indent={indent} line={[{link: `test: ${appState.js.fileExt} ,`, msg:{type:"blinkJs", id:1}}]} />);
    finalLines.push(<CommentLine indent={indent} str="exclude node_modules" />);
    finalLines.push(<StringLine indent={indent} str='exclude: /node_modules/,' />);
	// use babel loader
	if(appState.js.jsVersion !== "es5" || appState.js.jsx === true){
    finalLines.push(<CommentLine indent={indent} str="babel loader is included using if jsx and or js transpiling" />);
	finalLines.push(<LineContent indent={indent} line={[{link: 'use: babel-loader,', msg:{type:"blinkJs", id:0}}]} />);
	}
	indent=3;
    finalLines.push(<StringLine indent={indent} str='},' />);
    }

    if(appState.styles.on){
    finalLines.push(<StringLine indent={indent} str='{' />);
	indent=4;
	finalLines.push(<LineContent indent={indent} line={[{link: `test: ${appState.styles.fileExt} ,`, msg:{type:"blinkStyles", id:2}}]} />);
	if(appState.styles.sass && appState.styles.format === "inline"){
	finalLines.push(<LineContent indent={indent} line={[{link: 'use: ["style-loader", "css-loader", "sass-loader"] ,', msg:{type:"blinkStyles", id:1}}]} />);
	} else if (!appState.styles.sass && appState.styles.format === "inline"){
    finalLines.push(<StringLine indent={indent} str='use: ["style-loader", "css-loader"] ,' />);
	} else if (appState.styles.sass && appState.styles.format === "extracted"){
	    finalLines.push(<LineContent indent={indent} line={[
		{str: "use: "},
		{link: '[MiniCssExtractPlugin.loader, ', msg:{type:"blinkStyles", id:4}},
		{link: '"css-loader", "sass-loader"] ,',  msg:{type:"blinkStyles", id:1}}		
	    ]} />);
	} else if (!appState.styles.sass && appState.styles.format === "extracted"){
	       finalLines.push(<LineContent indent={indent} line={[
		{str: "use: "},
		{link: '[minicssextractplugin.loader, ', msg:{type:"blinkStyles", id:4}},
		{str: '"css-loader"] ,'}		
	    ]} />);

	}
	indent=3;
    finalLines.push(<StringLine indent={indent} str='},' />);
    }

   if(appState.images.on){
    finalLines.push(<StringLine indent={indent} str='{' />);
	indent=4;
	finalLines.push(<LineContent indent={indent} line={[{link: `test: ${appState.images.fileExt} ,`, msg:{type:"blinkImages", id:1}}]} />);
    finalLines.push(<StringLine indent={indent} str='type: "assest/resource" ,' />);
	indent=3;
    finalLines.push(<StringLine indent={indent} str='},' />);
	}

   if(appState.fonts.on){
    finalLines.push(<StringLine indent={indent} str='{' />);
	indent=4;
	finalLines.push(<LineContent indent={indent} line={[{link: `test: ${appState.fonts.fileExt} ,`, msg:{type:"blinkFonts", id:1}}]} />);
    finalLines.push(<StringLine indent={indent} str='type: "assest/resource" ,' />);
	indent=3;
    finalLines.push(<StringLine indent={indent} str='},' />);
	}
    
	indent=2;
    finalLines.push(<StringLine indent={indent} str='],' />);
	indent=1;
    finalLines.push(<StringLine indent={indent} str='},' />);

    if(appState.js.sourceMaps && appState.js.on){
	finalLines.push(<LineContent indent={indent} line={[{link: `devtool: source-maps,`, msg:{type:"blinkJs", id:5}}]} />);
    }
    
    if(appState.js.HMR && appState.js.on){
    finalLines.push(<StringLine indent={indent} str='devServer:{' />);
	indent=2;
	finalLines.push(<LineContent indent={indent} line={[{link: `hot: true ,`, msg:{type:"blinkJs", id:4}}]} />);
	indent=1;
	finalLines.push(<StringLine indent={indent} str='},' />);
    }

    if(appState.styles.minify && appState.styles.on){
	finalLines.push(<LineContent indent={indent} line={[{link: 'plugins: [new CssMinimizerPlugin()],', msg:{type:"blinkStyles", id:3}}]} />);
    }
	indent=0;

	finalLines.push(<StringLine indent={indent} str='};' />);


  return <File name="webpack" lineContent={finalLines} />;
}


function BabelFile(props: { appState: AppState }): Element<typeof File> {
    const appState = props.appState;
    let indent = 0;
  let finalLines: Element<any>[] = [];

    if((appState.js.jsx || appState.js.jsx) && appState.js.on){
	finalLines.push(<StringLine indent={indent} str='{' />);
	indent = 1;

	// presets
	let temp = [{str: "presets:[ "}];
	if(appState.js.jsx){
	    temp.push({
		link: '"@babael/preset-react," ',
		msg:{type:"blinkJs", id:3}
	    });
	}

	if(appState.js.jsVersion === "env"){
	    temp.push({
		link: '"@babael/preset-env," ',
		msg:{type:"blinkJs", id:2}
	    });
	}
	temp.push({str:'],'});
	finalLines.push(<LineContent indent={indent} line={temp} />);

	// plugins
	if(appState.js.jsx){
	    finalLines.push(<LineContent indent={indent} line={[{link: '"plugins": ["@babel/plugin-proposal-class-properties"],', msg:{type:"blinkJs", id:3}}]} />);
	}

	indent = 0;
	finalLines.push(<StringLine indent={indent} str='}' />);

    }
    
  return <File name="babel" lineContent={finalLines} />;

}


function DependencyFile(props: { appState: AppState }): Element<typeof File> {
    const appState = props.appState;
    let indent = 0;
  let finalLines: Element<any>[] = [];

    let temp = [
	{str: "webpack"},
	{str: "webpacl-cli"},
	{str: "webpacl-dev-server"},
    ];

    
    if((appState.js.jsx || appState.js.jsVersion === "env") && appState.js.on){
	temp.push({link: "@babel/core", msg:{type:"blinkJs", id:0}});
	temp.push({link: "@babel/cli", msg:{type:"blinkJs", id:0}});
	temp.push({link: "babel-loader", msg:{type:"blinkJs", id:0}});

	if(appState.js.jsx && appState.js.jsVersion === "env"){
	    temp.push({link: "@babel/plugin-proposal-class-properties", msg:{type:"blinkJs", id:0}});
	}

	if(appState.js.jsx){
	    temp.push({link: "preset-react", msg:{type:"blinkJs", id:3}});
	}
    }

    if(appState.styles.on){
	temp.push({str:"css-loader"});
	if(appState.styles.minify){
	    temp.push({link: "css-minimizer-webpack-plugin", msg:{type:"blinkStyles", id:3}});
	}
	if(appState.styles.format === "inline"){
	    temp.push({link: "style-loader", msg:{type:"blinkStyles", id:4}});
	} else{
	    temp.push({link: "mini-css-extract-plugin", msg:{type:"blinkStyles", id:4}});
	}

	if(appState.styles.sass){
	    temp.push({link: "sass-loader", msg:{type:"blinkStyles", id:1}});
	    temp.push({link: "sass", msg:{type:"blinkStyles", id:1}});
	}
    }

    temp = chopArr(temp, 3);

    finalLines = temp.map((item) => {
	item.unshift({str:"npm install --save-dev "});
	return <LineContent indent={indent} line={item} />;
    });
    
  return <File name="dependency" lineContent={finalLines} />;
}

function chopArr<T>(arr:Array<T>, n:number):  Array<Array<T>>{
    let temp = [];
    const page = arr.length / n

    // take enough pages i.e. i
    for (let i = 0; i < page; i++){
	temp.push(arr.slice(i*n, (i+1)*n));
    }

    return temp;

}

function CommentLine(props:{indent:number, str:string}): Element<any>{
    return (
	<LineContent indent={props.indent} line={[{str:"// " + props.str}]} />
    );
}

function StringLine(props:{indent:number, str:string}): Element<any>{
    return (
	<LineContent indent={props.indent} line={[{str:props.str}]} />
    );
}
