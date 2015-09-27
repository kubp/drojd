module.exports = {

    /**
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter: function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
   },

    /**
     * @param text String to escape
     * @returns {string|void|XML|*} Escaped text. Similar to htmlspecialchars
     */
    escapeHtml: function(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

     return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }


};




