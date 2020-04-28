import React, { useEffect, useState } from 'react';

const CountryProfile = ({country}) => {
    const [countryProfiles, setCountryProfiles] = useState({});
    useEffect(() => {
        if (country) {
            fetch('https://corona.lmao.ninja/v2/countries/' + country.code)
            .then(res => res.json())
            .then(res => {
                setCountryProfiles(res)
            },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log('Error:', error);
                }
            )
        }
    }, [country])

    return (<React.Fragment>
        <table>
            <tbody>
                <tr>
                    <td>Country</td>
                    <td>{countryProfiles.country}</td>
                </tr>
                <tr>
                    <td>Cases</td>
                    <td>{countryProfiles.cases}</td>
                </tr>
                <tr>
                    <td>Active</td>
                    <td>{countryProfiles.active}</td>
                </tr>
                <tr>
                    <td>Deaths</td>
                    <td>{countryProfiles.deaths}</td>
                </tr>
                <tr>
                    <td>Recovered</td>
                    <td>{countryProfiles.recovered}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>);
}

export default CountryProfile;