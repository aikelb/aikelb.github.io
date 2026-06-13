// return a random item from a collection, excluding the current page
// {% set collection = collections._posts | random(page) %}
export default function(collections, avoid) {
    const avoidUrl = avoid && avoid.url;
    const pool = (collections || []).filter(item => item.url !== avoidUrl);
    // fall back to the original collection if filtering left nothing
    const source = pool.length ? pool : (collections || []);
    if (!source.length) {
        return [];
    }
    const selected = source[Math.floor(Math.random() * source.length)];
    return [selected];
};
