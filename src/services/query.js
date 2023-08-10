const DEAFULT_PAGE_NUMBER = 1;
const DEAFULT_PAGE_LIMIT = 0;

function getPagination(query) {
    const page = Math.abs(query.page) || DEAFULT_PAGE_NUMBER;
    const limit = Math.abs(query.limit) || DEAFULT_PAGE_LIMIT;
    const skip = (page - 1) * limit
// Get the sort field and order from query
const sortBy = query.sortBy || null; // Field to sort by
// Example usage in frontend: sortBy=name&order=asc
const order = query.order === 'desc' ? -1 : 1; // Sorting order (asc or desc)

return {
    skip,
    limit,
    sortBy: sortBy ? { [sortBy]: order } : null, // Returning null if sortBy is not provided
};
    
}

module.exports = {
    getPagination,
}