import React from 'react';
import { useState, useEffect } from 'react';
import Instruction from './components/Instructions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import API from './actions/APIConsumer';

const SearchAPI = API('https://search.dev.youvisit.com/institution-profiles');

const App = () => {
    const [profiles, setProfiles] = useState([]);
    const [selectedID, setSelectedID] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await SearchAPI.getInstitutionProfiles();
            setProfiles(response);
            console.log(
                `initial profiles = ${profiles} and response = ${response.inst_id}`
            );
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(selectedID);
        goToInstructions();
        return () => {
            goToInstructions();
        };
    }, [selectedID]);
    const goToInstructions = () => {
        if (selectedID) window.location.href = `instruction/${selectedID}`;
    };

    const executeSearch = async (query) => {
        console.log(query);
        const search = await SearchAPI.getInstitutionProfiles(query);
        setProfiles(search);
        console.log(profiles);
    };

    const renderSearchResults = (profiles = []) => {
        let results = profiles.map((item, index) => (
            <p
                className="schoolNames"
                key={index}
                id={item.inst_id}
                onClick={selectInstID}
            >
                {item.institution_name}
            </p>
        ));
        return results;
    };
    const selectInstID = (ev) => {
        ev.preventDefault();
        let id = ev.target.id;
        setSelectedID(id);
    };

    let pauseSearch;

    const handleChildChange = async (searchTerm) => {
        console.log('this is search parent, I got it', searchTerm.query);

        if (pauseSearch) {
            clearTimeout(pauseSearch);
        }
        pauseSearch = setTimeout(() => {
            executeSearch(searchTerm.query);
        }, 600);
        console.log('this is parent, search term is:', searchTerm.query);
    };

    // const convertProfiles = (profiles = []) => {
    //     let containers = profiles.map((profile, i) => {
    //         return (
    //             <div
    //                 index={i}
    //                 key={i + profile.name}
    //                 name={profile.institution_name}
    //                 img={profile.yv_profile_img}
    //                 tuition={profile.instate_tuition}
    //                 link={profile.inst_id}
    //                 onImageError={(ev) => {
    //                     const currentImage = ev.target;
    //                     currentImage.src =
    //                         'https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg';
    //                 }}
    //             />
    //         );
    //     });
    //     return containers;
    // };

    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        path="/instruction/:institutionID"
                        render={(props) => {
                            console.log(props);
                            return (
                                <Instruction
                                    institutionID={
                                        props.match.params.institutionID
                                    }
                                />
                            );
                        }}
                    />
                    <Route path="/">
                        <div className="container">
                            <h2 className="searchTitle">
                                Search for your Institution
                            </h2>
                            <Search onChildChange={handleChildChange} />
                            {renderSearchResults(profiles)}
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;

// export const query = gql`
//   query Institution($institutionID: String!) {
//     institutions(instID: $institutionID) {
//       locations {
//         loc_id
//         name
//         experience_type
//         cover_photo {
//           thumb
//           full
//         }
//         stops {
//           stopid
//           title
//           panoramas {
//             smallurl
//             thumburl
//           }
//         }
//       }
//       name
//       inst_id
//     }
//   }
// `;
