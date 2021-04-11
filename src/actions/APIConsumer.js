const API = (baseURL) => {
    return {
        getInstitutionProfiles: async (query, page = 0) => {
            const data = await fetch(
                `${baseURL}?page=${page}&search-term=${query ? query : ''}`
            );
            let institutionData = await data.json();
            return institutionData.data.records;
        },
    };
};

export default API;
