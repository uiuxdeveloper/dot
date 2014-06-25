////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD doT.js TEMPLATE                                                                                                           //
//                                                                                                                                //
//  Description: Dynamically loads doT.js template through an AJAX request                                                        //
//  Params                                                                                                                        //
//      tmpl:                               - Name of the template file                                                           //
//      scriptId:                           - ID of the script reference in file being loaded from /JS/tmpl/ directory             //
//      eleId:                              - ID of the DOM element that is being populated with the template                     //
//      data:                               - Incoming data being fed into doT.js template engine and rendered into final output  //
//      mode: (insert, append, prepend)     - Defines how jquery going to populate the ele with the output                        //
//      beforeStart:                        - Call a function when the ajax starts processing                                     //
//      callback:                           - Call a function when the ajax is finished processing                                //
//                                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// doT.min.js Dependancy
/* Laura Doktorova https://github.com/olado/doT */(function () {
    function o() { var a = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" }, b = /&(?!#?\w+;)|<|>|"|'|\//g; return function () { return this ? this.replace(b, function (c) { return a[c] || c }) : this } } function p(a, b, c) {
        return (typeof b === "string" ? b : b.toString()).replace(a.define || i, function (l, e, f, g) {
            if (e.indexOf("def.") === 0) e = e.substring(4); if (!(e in c)) if (f === ":") { a.defineParams && g.replace(a.defineParams, function (n, h, d) { c[e] = { arg: h, text: d} }); e in c || (c[e] = g) } else (new Function("def", "def['" +
e + "']=" + g))(c); return ""
        }).replace(a.use || i, function (l, e) { if (a.useParams) e = e.replace(a.useParams, function (g, n, h, d) { if (c[h] && c[h].arg && d) { g = (h + ":" + d).replace(/'|\\/g, "_"); c.__exp = c.__exp || {}; c.__exp[g] = c[h].text.replace(RegExp("(^|[^\\w$])" + c[h].arg + "([^\\w$])", "g"), "$1" + d + "$2"); return n + "def.__exp['" + g + "']" } }); var f = (new Function("def", "return " + e))(c); return f ? p(a, f, c) : f })
    } function m(a) { return a.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ") } var j = { version: "1.0.0", templateSettings: { evaluate: /\{\{([\s\S]+?\}?)\}\}/g,
        interpolate: /\{\{=([\s\S]+?)\}\}/g, encode: /\{\{!([\s\S]+?)\}\}/g, use: /\{\{#([\s\S]+?)\}\}/g, useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g, define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g, defineParams: /^\s*([\w$]+):([\s\S]+)/, conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g, varname: "it", strip: true, append: true, selfcontained: false
    }, template: undefined,
        compile: undefined
    }; if (typeof module !== "undefined" && module.exports) module.exports = j; else if (typeof define === "function" && define.amd) define(function () { return j }); else (function () { return this || (0, eval)("this") })().doT = j; String.prototype.encodeHTML = o(); var q = { append: { start: "'+(", end: ")+'", endencode: "||'').toString().encodeHTML()+'" }, split: { start: "';out+=(", end: ");out+='", endencode: "||'').toString().encodeHTML();out+='"} }, i = /$^/; j.template = function (a, b, c) {
        b = b || j.templateSettings; var l = b.append ? q.append :
q.split, e, f = 0, g; a = b.use || b.define ? p(b, a, c || {}) : a; a = ("var out='" + (b.strip ? a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : a).replace(/'|\\/g, "\\$&").replace(b.interpolate || i, function (h, d) { return l.start + m(d) + l.end }).replace(b.encode || i, function (h, d) { e = true; return l.start + m(d) + l.endencode }).replace(b.conditional || i, function (h, d, k) { return d ? k ? "';}else if(" + m(k) + "){out+='" : "';}else{out+='" : k ? "';if(" + m(k) + "){out+='" : "';}out+='" }).replace(b.iterate || i, function (h,
d, k, r) { if (!d) return "';} } out+='"; f += 1; g = r || "i" + f; d = m(d); return "';var arr" + f + "=" + d + ";if(arr" + f + "){var " + k + "," + g + "=-1,l" + f + "=arr" + f + ".length-1;while(" + g + "<l" + f + "){" + k + "=arr" + f + "[" + g + "+=1];out+='" }).replace(b.evaluate || i, function (h, d) { return "';" + m(d) + "out+='" }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "").replace(/(\s|;|\}|^|\{)out\+=''\+/g, "$1out+="); if (e && b.selfcontained) a = "String.prototype.encodeHTML=(" +
o.toString() + "());" + a; try { return new Function(b.varname, a) } catch (n) { typeof console !== "undefined" && console.log("Could not create a template function: " + a); throw n; } 
    }; j.compile = function (a, b) { return j.template(a, null, b) } 
})();


var DotTemplates = gapi.$extend({
    __classvars__: { tmpl_dir_path: '/js/doT/' },

    __init__: function (tmpl, scriptId, eleId, data, mode, beforeStart, callback) {
        $.DotTemplates = this;

        // Params
        $.DotTemplates.tmpl = tmpl;
        $.DotTemplates.scriptId = scriptId;
        $.DotTemplates.eleId = eleId;
        $.DotTemplates.data = data;
        $.DotTemplates.mode = mode;
        $.DotTemplates.beforeStart = beforeStart;
        $.DotTemplates.callback = callback;

        $.DotTemplates.model.processTmpl();                       // process the template
    },

    // Model
    model: {
        processTmpl: function () {
            if (typeof $.DotTemplates.beforeStart !== 'undefined' && $.DotTemplates.beforeStart != '')
                $.DotTemplates.beforeStart();

            if (typeof $.DotTemplates.model.getTmplData() === 'undefined') {
                $.ajax({
                    type: 'GET',
                    url: DotTemplates.tmpl_dir_path + $.DotTemplates.tmpl,
                    dataType: 'html',
                    cache: true,

                    success: function (data) {
                        $.DotTemplates.view.createContainer();       // Create container that stores raw template
                        $.DotTemplates.view.storeTmplData(data);   // Store raw template into DOM
                        $.DotTemplates.view.renderTmpl();             // Render the template
                    }
                });
            } else
                $.DotTemplates.view.renderTmpl();                    // Render the template
        },

        // return raw template
        getTmplData: function () {
            return $($.DotTemplates.scriptId).html();
        }
    },

    // View
    view: {
        // check if #tmpl-output container already exists and create if necessary
        createContainer: function () {
            if ($('tmpl-output').length < 1)
                $('body').append($('<div/>', { 'id': 'tmpl-output' }));
        },

        // empty the container
        resetContainer: function () {
            $('#tmpl-output').html('');
        },

        // store the raw template
        storeTmplData: function (data) {
            $('#tmpl-output').html(data);
        },

        renderTmpl: function () {
            var tmpl = doT.template($.DotTemplates.model.getTmplData()),
              html = tmpl($.DotTemplates.data);

            // insert template into DOM
            switch ($.DotTemplates.mode) {
                case 'append':
                    $($.DotTemplates.eleId).append(html);
                    break;
                case 'prepend':
                    $($.DotTemplates.eleId).prepend(html);
                    break;
                default:
                    $($.DotTemplates.eleId).html(html);
            }

            $.DotTemplates.controller.callback();               // Callback
        }
    },

    // Controller
    controller: {
        callback: function () {
            // callback
            if (typeof $.DotTemplates.callback == 'function')
                $.DotTemplates.callback();
            else
                $.DotTemplates.view.resetContainer();            // Reset container that stores raw template
        }
    }
});