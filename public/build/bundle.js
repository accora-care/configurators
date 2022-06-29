
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const bedVariants = {
        ARC: [
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Bavarian Beech", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            {
                title: "Locarno Cherry",
                options: {
                    quickship: true,
                },
            },
            { title: "Natural Dijon Walnut", options: { quickship: true } },
            { title: "Natural Lancaster Oak", options: { quickship: true } },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
        Atelier: [
            { title: "Bavarian Beech", options: {} },
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            { title: "Locarno Cherry", options: {} },
            { title: "Natural Dijon Walnut", options: {} },
            { title: "Natural Lancaster Oak", options: {} },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
        Bento: [
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Bavarian Beech", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            { title: "Locarno Cherry", options: {} },
            { title: "Natural Dijon Walnut", options: {} },
            { title: "Natural Lancaster Oak", options: {} },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
        Chateau: [
            { title: "Bavarian Beech", options: {} },
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            { title: "Locarno Cherry", options: {} },
            { title: "Natural Dijon Walnut", options: {} },
            { title: "Natural Lancaster Oak", options: {} },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza", options: {} },
        ],
        Classic: [
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Bavarian Beech", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            { title: "Locarno Cherry", options: {} },
            { title: "Natural Dijon Walnut", options: {} },
            { title: "Natural Lancaster Oak", options: {} },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
        Skandi: [
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Bavarian Beech", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            {
                title: "Locarno Cherry",
                options: {
                    quickship: true,
                },
            },
            { title: "Natural Dijon Walnut", options: { quickship: true } },
            { title: "Natural Lancaster Oak", options: { quickship: true } },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
        Vogue: [
            { title: "Anthracite Fineline Metallic", options: {} },
            { title: "Bavarian Beech", options: {} },
            { title: "Black Brown Thermo Oak", options: {} },
            { title: "Brown Fineline Metallic", options: {} },
            { title: "Brown Tossini Elm", options: {} },
            { title: "Grey Beige Bamenda", options: {} },
            { title: "Grey Beige Tossini Elm", options: {} },
            { title: "Lincoln Walnut", options: {} },
            { title: "Locarno Cherry", options: {} },
            { title: "Natural Dijon Walnut", options: {} },
            { title: "Natural Lancaster Oak", options: {} },
            { title: "Polar Aland Pine", options: {} },
            { title: "Sand Orleans Oak", options: {} },
            { title: "Tobacco Gladstone Oak", options: {} },
            { title: "Vicenza Oak", options: {} },
        ],
    };

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    // store.js
    const initVal = {
        variant: "Skandi",
        color: "Natural Lancaster Oak",
        sidePanel: "Included",
        liftingPole: "Not included",
        safetyMat: "Not included",
        assistBar: "None",
        selectorView: null,
    };
    const configStore = writable(initVal);

    /* src/components/SelectionGrid.svelte generated by Svelte v3.48.0 */

    const file$g = "src/components/SelectionGrid.svelte";

    function create_fragment$l(ctx) {
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "acc-grid");
    			toggle_class(div0, "acc-grid-hidden", !/*visible*/ ctx[0]);
    			add_location(div0, file$g, 4, 2, 84);
    			attr_dev(div1, "class", "acc-grid-container");
    			add_location(div1, file$g, 3, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*visible*/ 1) {
    				toggle_class(div0, "acc-grid-hidden", !/*visible*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectionGrid', slots, ['default']);
    	let { visible } = $$props;
    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectionGrid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ visible });

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, $$scope, slots];
    }

    class SelectionGrid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectionGrid",
    			options,
    			id: create_fragment$l.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*visible*/ ctx[0] === undefined && !('visible' in props)) {
    			console.warn("<SelectionGrid> was created without expected prop 'visible'");
    		}
    	}

    	get visible() {
    		throw new Error("<SelectionGrid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<SelectionGrid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/assets/icon-quickship.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$f = "src/components/assets/icon-quickship.svg.rollup-plugin.svelte";

    function create_fragment$k(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: "18" },
    		{ height: "10" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M17.385 3.399a.273.273 0 0 0 0-.547h-1.109V.923A.923.923 0 0 0 15.353 0H5.725a.918.918 0 0 0-.764.402L2.78 3.626a.371.371 0 0 1-.31.165H.598A.598.598 0 0 0 0 4.394v3.46a.598.598 0 0 0 .598.599h2.135a1.547 1.547 0 1 0 3.095 0h4.693a1.547 1.547 0 1 0 3.094 0h2.404a.273.273 0 0 0 0-.547h-2.414a1.547 1.547 0 1 0-3.094 0H5.838a1.547 1.547 0 0 0-3.094 0H.598a.052.052 0 0 1-.051-.051V4.394a.052.052 0 0 1 .051-.052h1.867a.918.918 0 0 0 .763-.402L5.415.717a.371.371 0 0 1 .31-.165h9.633a.376.376 0 0 1 .372.371v1.929h-5.452a.273.273 0 0 0 0 .547h5.452v2.063h-2.171a.273.273 0 0 0 0 .546h3.826a.274.274 0 0 0 0-.546h-1.109V3.399h1.11Zm-5.327 3.723a1.031 1.031 0 1 1 0 2.063 1.031 1.031 0 0 1 0-2.063Zm-7.767 0A1.031 1.031 0 1 1 3.9 7.2c.125-.051.26-.077.396-.077h-.005Z");
    			attr_dev(path, "fill", "#fff");
    			add_location(path, file$f, 0, 89, 89);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "18" },
    				{ height: "10" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_quickship_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_quickship_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_quickship_svg_rollup_plugin",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/components/SelectionGridItem.svelte generated by Svelte v3.48.0 */
    const file$e = "src/components/SelectionGridItem.svelte";

    // (11:4) {#if title}
    function create_if_block_1$1(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*title*/ ctx[2]);
    			attr_dev(div, "class", "acc-grid-item-title");
    			add_location(div, file$e, 11, 6, 313);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(11:4) {#if title}",
    		ctx
    	});

    	return block;
    }

    // (14:4) {#if isQuickship}
    function create_if_block$1(ctx) {
    	let div;
    	let iconquickship;
    	let t0;
    	let span;
    	let current;
    	iconquickship = new Icon_quickship_svg_rollup_plugin({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(iconquickship.$$.fragment);
    			t0 = space();
    			span = element("span");
    			span.textContent = "Quickship";
    			attr_dev(span, "class", "acc-grid-item-qctext");
    			add_location(span, file$e, 15, 26, 462);
    			attr_dev(div, "class", "acc-grid-item-quickship");
    			add_location(div, file$e, 14, 6, 398);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(iconquickship, div, null);
    			append_dev(div, t0);
    			append_dev(div, span);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconquickship.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(iconquickship.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(iconquickship);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(14:4) {#if isQuickship}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	let if_block0 = /*title*/ ctx[2] && create_if_block_1$1(ctx);
    	let if_block1 = /*isQuickship*/ ctx[3] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(div0, "class", "acc-grid-item");
    			toggle_class(div0, "active", /*active*/ ctx[0]);
    			add_location(div0, file$e, 8, 2, 218);
    			attr_dev(div1, "class", "acc-grid-item-wrapper");
    			add_location(div1, file$e, 7, 0, 180);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			append_dev(div0, t0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t1);
    			if (if_block1) if_block1.m(div0, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div0,
    					"click",
    					function () {
    						if (is_function(/*onClick*/ ctx[1])) /*onClick*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (/*title*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(div0, t1);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*isQuickship*/ ctx[3]) {
    				if (if_block1) {
    					if (dirty & /*isQuickship*/ 8) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*active*/ 1) {
    				toggle_class(div0, "active", /*active*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectionGridItem', slots, ['default']);
    	let { active } = $$props;
    	let { onClick } = $$props;
    	let { title = "" } = $$props;
    	let { isQuickship = false } = $$props;
    	const writable_props = ['active', 'onClick', 'title', 'isQuickship'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectionGridItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('onClick' in $$props) $$invalidate(1, onClick = $$props.onClick);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('isQuickship' in $$props) $$invalidate(3, isQuickship = $$props.isQuickship);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		active,
    		onClick,
    		title,
    		isQuickship,
    		IconQuickship: Icon_quickship_svg_rollup_plugin
    	});

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('onClick' in $$props) $$invalidate(1, onClick = $$props.onClick);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('isQuickship' in $$props) $$invalidate(3, isQuickship = $$props.isQuickship);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, onClick, title, isQuickship, $$scope, slots];
    }

    class SelectionGridItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {
    			active: 0,
    			onClick: 1,
    			title: 2,
    			isQuickship: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectionGridItem",
    			options,
    			id: create_fragment$j.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*active*/ ctx[0] === undefined && !('active' in props)) {
    			console.warn("<SelectionGridItem> was created without expected prop 'active'");
    		}

    		if (/*onClick*/ ctx[1] === undefined && !('onClick' in props)) {
    			console.warn("<SelectionGridItem> was created without expected prop 'onClick'");
    		}
    	}

    	get active() {
    		throw new Error("<SelectionGridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<SelectionGridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onClick() {
    		throw new Error("<SelectionGridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClick(value) {
    		throw new Error("<SelectionGridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<SelectionGridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SelectionGridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isQuickship() {
    		throw new Error("<SelectionGridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isQuickship(value) {
    		throw new Error("<SelectionGridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const getImageUrl = (path) => {
        return '' + path;
    };

    /* src/components/Img.svelte generated by Svelte v3.48.0 */
    const file$d = "src/components/Img.svelte";

    function create_fragment$i(ctx) {
    	let img;
    	let img_src_value;

    	let img_levels = [
    		{
    			src: img_src_value = getImageUrl(/*src*/ ctx[0])
    		},
    		{ class: /*clz*/ ctx[1] },
    		{ alt: "" },
    		/*rest*/ ctx[2]
    	];

    	let img_data = {};

    	for (let i = 0; i < img_levels.length; i += 1) {
    		img_data = assign(img_data, img_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			img = element("img");
    			set_attributes(img, img_data);
    			add_location(img, file$d, 16, 0, 672);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(img, img_data = get_spread_update(img_levels, [
    				{ src: img_src_value },
    				{ class: /*clz*/ ctx[1] },
    				{ alt: "" },
    				/*rest*/ ctx[2]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Img', slots, []);

    	var __rest = this && this.__rest || function (s, e) {
    		var t = {};
    		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    		if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    		}

    		return t;
    	};

    	let { src, class: clz } = $$restProps,
    		rest = __rest($$restProps, ["src", "class"]);

    	console.log(clz, rest);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({ __rest, getImageUrl, src, clz, rest });

    	$$self.$inject_state = $$new_props => {
    		if ('__rest' in $$props) __rest = $$new_props.__rest;
    		if ('src' in $$props) $$invalidate(0, src = $$new_props.src);
    		if ('clz' in $$props) $$invalidate(1, clz = $$new_props.clz);
    		if ('rest' in $$props) $$invalidate(2, rest = $$new_props.rest);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [src, clz, rest];
    }

    class Img extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Img",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src/components/SelectionGridItemImage.svelte generated by Svelte v3.48.0 */

    function create_fragment$h(ctx) {
    	let img;
    	let current;

    	const img_spread_levels = [
    		{
    			class: "acc-grid-item-preview-image " + /*cls*/ ctx[0]
    		},
    		{ alt: "" },
    		/*rest*/ ctx[1]
    	];

    	let img_props = {};

    	for (let i = 0; i < img_spread_levels.length; i += 1) {
    		img_props = assign(img_props, img_spread_levels[i]);
    	}

    	img = new Img({ props: img_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const img_changes = (dirty & /*cls, rest*/ 3)
    			? get_spread_update(img_spread_levels, [
    					dirty & /*cls*/ 1 && {
    						class: "acc-grid-item-preview-image " + /*cls*/ ctx[0]
    					},
    					img_spread_levels[1],
    					dirty & /*rest*/ 2 && get_spread_object(/*rest*/ ctx[1])
    				])
    			: {};

    			img.$set(img_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectionGridItemImage', slots, []);

    	var __rest = this && this.__rest || function (s, e) {
    		var t = {};
    		for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

    		if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    			if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    		}

    		return t;
    	};

    	let { class: cls } = $$restProps, rest = __rest($$restProps, ["class"]);

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({ __rest, Img, cls, rest });

    	$$self.$inject_state = $$new_props => {
    		if ('__rest' in $$props) __rest = $$new_props.__rest;
    		if ('cls' in $$props) $$invalidate(0, cls = $$new_props.cls);
    		if ('rest' in $$props) $$invalidate(1, rest = $$new_props.rest);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cls, rest];
    }

    class SelectionGridItemImage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectionGridItemImage",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src/empresa/Select/SelectPreviewColor.svelte generated by Svelte v3.48.0 */

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:4) <SelectionGridItem       isQuickship={colorVariant.options.quickship}       title={colorVariant.title}       active={$configStore.color === colorVariant.title}       onClick={() => {         configStore.update((s) => {           return {             ...s,             color: colorVariant.title,           };         });       }}     >
    function create_default_slot_1$5(ctx) {
    	let selectiongriditemimage;
    	let t;
    	let current;

    	selectiongriditemimage = new SelectionGridItemImage({
    			props: {
    				src: `/images/empresa/colors/${/*colorVariant*/ ctx[4].title}.png`,
    				alt: /*colorVariant*/ ctx[4].title
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditemimage.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditemimage, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const selectiongriditemimage_changes = {};
    			if (dirty & /*sortedColors*/ 1) selectiongriditemimage_changes.src = `/images/empresa/colors/${/*colorVariant*/ ctx[4].title}.png`;
    			if (dirty & /*sortedColors*/ 1) selectiongriditemimage_changes.alt = /*colorVariant*/ ctx[4].title;
    			selectiongriditemimage.$set(selectiongriditemimage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditemimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditemimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditemimage, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(11:4) <SelectionGridItem       isQuickship={colorVariant.options.quickship}       title={colorVariant.title}       active={$configStore.color === colorVariant.title}       onClick={() => {         configStore.update((s) => {           return {             ...s,             color: colorVariant.title,           };         });       }}     >",
    		ctx
    	});

    	return block;
    }

    // (10:2) {#each sortedColors as colorVariant}
    function create_each_block$2(ctx) {
    	let selectiongriditem;
    	let current;

    	function func() {
    		return /*func*/ ctx[3](/*colorVariant*/ ctx[4]);
    	}

    	selectiongriditem = new SelectionGridItem({
    			props: {
    				isQuickship: /*colorVariant*/ ctx[4].options.quickship,
    				title: /*colorVariant*/ ctx[4].title,
    				active: /*$configStore*/ ctx[1].color === /*colorVariant*/ ctx[4].title,
    				onClick: func,
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditem, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const selectiongriditem_changes = {};
    			if (dirty & /*sortedColors*/ 1) selectiongriditem_changes.isQuickship = /*colorVariant*/ ctx[4].options.quickship;
    			if (dirty & /*sortedColors*/ 1) selectiongriditem_changes.title = /*colorVariant*/ ctx[4].title;
    			if (dirty & /*$configStore, sortedColors*/ 3) selectiongriditem_changes.active = /*$configStore*/ ctx[1].color === /*colorVariant*/ ctx[4].title;
    			if (dirty & /*sortedColors*/ 1) selectiongriditem_changes.onClick = func;

    			if (dirty & /*$$scope, sortedColors*/ 129) {
    				selectiongriditem_changes.$$scope = { dirty, ctx };
    			}

    			selectiongriditem.$set(selectiongriditem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(10:2) {#each sortedColors as colorVariant}",
    		ctx
    	});

    	return block;
    }

    // (9:0) <SelectionGrid visible={$configStore.selectorView === "COLOR"}>
    function create_default_slot$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*sortedColors*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sortedColors, $configStore, configStore*/ 3) {
    				each_value = /*sortedColors*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(9:0) <SelectionGrid visible={$configStore.selectorView === \\\"COLOR\\\"}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let selectiongrid;
    	let current;

    	selectiongrid = new SelectionGrid({
    			props: {
    				visible: /*$configStore*/ ctx[1].selectorView === "COLOR",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongrid.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongrid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const selectiongrid_changes = {};
    			if (dirty & /*$configStore*/ 2) selectiongrid_changes.visible = /*$configStore*/ ctx[1].selectorView === "COLOR";

    			if (dirty & /*$$scope, sortedColors, $configStore*/ 131) {
    				selectiongrid_changes.$$scope = { dirty, ctx };
    			}

    			selectiongrid.$set(selectiongrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let sortedColors;
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(1, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectPreviewColor', slots, []);
    	let { colors } = $$props;
    	const writable_props = ['colors'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectPreviewColor> was created with unknown prop '${key}'`);
    	});

    	const func = colorVariant => {
    		configStore.update(s => {
    			return { ...s, color: colorVariant.title };
    		});
    	};

    	$$self.$$set = $$props => {
    		if ('colors' in $$props) $$invalidate(2, colors = $$props.colors);
    	};

    	$$self.$capture_state = () => ({
    		colors,
    		SelectionGrid,
    		SelectionGridItem,
    		SelectionGridItemImage,
    		configStore,
    		sortedColors,
    		$configStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('colors' in $$props) $$invalidate(2, colors = $$props.colors);
    		if ('sortedColors' in $$props) $$invalidate(0, sortedColors = $$props.sortedColors);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*colors*/ 4) {
    			$$invalidate(0, sortedColors = colors.sort(a => {
    				var _a;

    				return ((_a = a.options) === null || _a === void 0
    				? void 0
    				: _a.quickship)
    				? -1
    				: 1;
    			}));
    		}
    	};

    	return [sortedColors, $configStore, colors, func];
    }

    class SelectPreviewColor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { colors: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectPreviewColor",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*colors*/ ctx[2] === undefined && !('colors' in props)) {
    			console.warn("<SelectPreviewColor> was created without expected prop 'colors'");
    		}
    	}

    	get colors() {
    		throw new Error("<SelectPreviewColor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set colors(value) {
    		throw new Error("<SelectPreviewColor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/empresa/assets/icon-headboard.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$c = "src/empresa/assets/icon-headboard.svg.rollup-plugin.svelte";

    function create_fragment$f(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: "48" },
    		{ height: "48" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M16.805 9.1c-.75.133-1.75.667-2.5 1.333-1.3 1.142-1.585 1.234-4.032 1.234-1.697 0-1.706 0-1.913.208l-.215.2v4.508c0 4.284-.009 4.5-.155 4.5-.31 0-1.233.359-1.741.675-.948.592-1.534 1.3-1.973 2.4l-.224.55-.026 5.942L4 36.583l.215.209.216.208h30.866l.207-.208c.284-.267.284-.65 0-.917l-.207-.208H5.387v-5.334H7.24c1.861 0 1.861 0 2.068-.208.284-.267.284-.65 0-.917L9.101 29H5.37l.035-2.067.025-2.058.276-.558c.38-.775.862-1.259 1.646-1.634l.655-.308h31.986l.655.308c.784.375 1.267.859 1.646 1.634l.276.558.025 2.058L42.63 29H12.703l-.207.208c-.284.267-.284.65 0 .917l.207.208h29.91v5.334H40.76c-1.861 0-1.861 0-2.068.208-.284.267-.284.65 0 .917l.207.208h4.67l.216-.208.215-.209-.026-5.933-.026-5.942-.224-.55c-.327-.816-.611-1.241-1.206-1.816-.595-.567-1.43-1.017-2.189-1.184l-.474-.1v-4.475c0-4.283-.008-4.491-.163-4.675-.164-.2-.19-.2-2.138-.241l-1.964-.042-.578-.267c-.37-.166-.818-.475-1.249-.875-.396-.35-.94-.741-1.301-.925C31.402 9.017 31.22 9 26.172 9h-4.507l-.207.208a.64.64 0 0 0-.215.459.64.64 0 0 0 .215.458l.207.208h4.463c5.584 0 5.369-.041 6.79 1.234.785.7 1.741 1.2 2.577 1.341.284.05 1.069.092 1.75.092h1.232v8h-2.74l-.026-1.4-.035-1.4-.319-.633c-.388-.759-.887-1.225-1.689-1.592l-.577-.267h-7.152l-.569.259c-.31.15-.75.433-.974.633l-.396.375-.396-.375a5.07 5.07 0 0 0-.974-.633l-.569-.259H14.91l-.577.267c-.802.367-1.301.833-1.69 1.592l-.318.633-.034 1.4-.026 1.4h-2.74v-8h1.275c.767 0 1.5-.05 1.852-.125.82-.167 1.672-.625 2.482-1.35.853-.758 1.525-1.092 2.37-1.167.448-.041.637-.1.784-.241.267-.259.259-.65-.017-.909-.233-.233-.647-.258-1.465-.108Zm5.075 8c.474.133 1.19.825 1.327 1.283.06.2.104.834.104 1.484V21H13.66v-1.133c0-.65.043-1.284.103-1.484.13-.425.853-1.141 1.275-1.275.44-.133 6.377-.141 6.842-.008Zm11.03 0c.474.133 1.19.825 1.327 1.283.06.2.103.834.103 1.484V21H24.69v-1.133c0-.65.043-1.284.104-1.484.129-.425.853-1.141 1.275-1.275.44-.133 6.377-.141 6.842-.008Z");
    			attr_dev(path, "fill", "#333");
    			add_location(path, file$c, 0, 89, 89);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "48" },
    				{ height: "48" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_headboard_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_headboard_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_headboard_svg_rollup_plugin",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/empresa/assets/icon-color.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$b = "src/empresa/assets/icon-color.svg.rollup-plugin.svelte";

    function create_fragment$e(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: "48" },
    		{ height: "48" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M6.122 4.117c-.406.149-.938.711-1.047 1.117-.063.227-.086 5-.07 16.555l.023 16.234.18.625c.25.883.867 2.086 1.422 2.758.922 1.102 2.336 2.008 3.71 2.375.852.22 2.47.242 3.337.04A7.157 7.157 0 0 0 15.73 43c.258-.157 2.422-1.68 4.805-3.376 2.383-1.703 8.14-5.805 12.789-9.125 4.789-3.414 8.531-6.14 8.64-6.281.36-.485.454-1.078.258-1.61-.14-.39-1.773-2.648-1.984-2.742-.688-.32-1.367.375-1.016 1.032.047.093.422.64.82 1.203.407.57.727 1.07.712 1.117-.032.094-4.72 3.437-4.813 3.437-.062 0-5.781-7.96-6.062-8.43-.047-.062.03-.304.195-.648l.266-.547 1.96-1.398c1.087-.766 2.008-1.398 2.047-1.398.047 0 .368.406.72.898.733 1.031.952 1.195 1.413 1.062.344-.101.54-.367.54-.734 0-.21-.133-.46-.595-1.117-.742-1.063-1-1.336-1.398-1.524-.375-.171-.96-.187-1.32-.039-.14.063-.578.344-.969.625-.398.282-.734.516-.758.516-.023 0 .172-.406.43-.898.414-.797.469-.946.469-1.352 0-.547-.227-1.031-.625-1.352-.149-.117-2.516-1.359-5.258-2.765L22.02 5l-.539.031c-.664.032-1.086.29-1.383.828-.109.204-.351.633-.523.954l-.328.586-.04-1.149c-.038-1.117-.046-1.148-.273-1.484a1.842 1.842 0 0 0-.656-.555l-.43-.21h-5.703c-4.718.007-5.765.023-6.023.116ZM17.645 8.57v3.008H6.552V8.625c0-1.625.023-2.984.054-3.008.024-.03 2.524-.054 5.547-.054h5.492V8.57Zm8.899.508c2.71 1.399 4.773 2.508 4.773 2.563 0 .062-.61 1.281-1.344 2.719l-1.351 2.601-.86-.453c-.468-.25-2.593-1.344-4.703-2.43l-3.851-1.976v-1.157l.945-1.851c1.258-2.453 1.305-2.531 1.469-2.5.078.015 2.289 1.133 4.922 2.484Zm-8.899 7.11v3.047H6.552V13.14h11.093v3.047Zm5.938-.078a672.682 672.682 0 0 1 4.281 2.218c.023.032-2.586 5.227-2.687 5.352-.016.015-.297-.11-.633-.281-.336-.18-1.524-.782-2.64-1.36a198.018 198.018 0 0 1-2.345-1.21l-.312-.173-.024-3.367c-.007-1.851.008-3.367.047-3.367.032 0 1.977.984 4.313 2.188Zm11.015 11.5c0 .03-1.093.835-2.43 1.796-2.32 1.649-2.437 1.727-2.546 1.579-.977-1.313-3.695-5.196-3.695-5.266 0-.094.89-1.86 2.437-4.828l.625-1.196 2.805 3.93c1.539 2.164 2.804 3.953 2.804 3.985Zm-16.953-3.805v3.008H6.552v-6.016h11.093v3.008Zm4.47.11 2.32 1.187-.977 1.89c-.54 1.04-1.156 2.25-1.383 2.688l-.398.797-1.235-.633-1.234-.64v-3.329c0-1.836.023-3.36.055-3.383.023-.03.156.016.289.094.132.078 1.289.68 2.562 1.328Zm4.632 5.741c.89 1.242 1.633 2.297 1.648 2.344.032.086-4.734 3.523-4.851 3.5-.024 0-.399-.492-.82-1.086l-.766-1.078 1.125-2.188a475.674 475.674 0 0 0 1.539-2.992c.219-.437.43-.789.46-.78.032.015.782 1.038 1.665 2.28Zm-9.102 3.352c0 4.36-.008 4.672-.156 5.242-.242.961-.719 1.781-1.445 2.508-.711.71-1.367 1.125-2.266 1.422-.539.18-.758.21-1.601.21-.711 0-1.118-.038-1.477-.14-1.89-.523-3.39-2.008-3.96-3.922-.126-.414-.142-.937-.165-5.21l-.031-4.743H17.645v4.633Zm2.477-1.57c.422.218.781.414.797.422.031.03-1.54 3.085-1.64 3.187-.04.047-.071-.703-.071-1.969 0-1.281.031-2.047.078-2.047.039 0 .414.18.836.407ZM21.59 35.5c.218.313.453.656.523.766l.14.21-1.437 1.024c-.797.57-1.469 1.031-1.492 1.031-.023 0 .367-.804.875-1.797.508-.984.938-1.796.96-1.789.024 0 .22.25.43.555Z");
    			attr_dev(path, "fill", "#000");
    			add_location(path, file$b, 0, 89, 89);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "48" },
    				{ height: "48" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_color_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_color_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_color_svg_rollup_plugin",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/empresa/assets/icon-safety.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$a = "src/empresa/assets/icon-safety.svg.rollup-plugin.svelte";

    function create_fragment$d(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: "48" },
    		{ height: "48" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M5.519 10.19c-1.14.534-1.492 2.06-.719 3.095.117.167 1.36 1.026 3.29 2.283l3.094 2.028-2.907.04c-3.29.048-3.242.04-3.805.684-.453.525-.578 1.13-.383 1.814.125.437.774 1.098 1.203 1.225.227.063 1.102.095 2.884.095h2.57l4.454 1.957c2.453 1.082 4.485 1.98 4.516 2.013.031.024-1.899.89-4.29 1.917-2.687 1.161-4.383 1.933-4.446 2.028-.085.12-.109.597-.109 2.283v2.124l-.195.294c-1.102 1.655.094 3.93 2.07 3.93 1.977 0 3.173-2.275 2.07-3.93-.171-.262-.194-.373-.194-1.042v-.755h18.752v.755c0 .669-.024.78-.196 1.042-1.101 1.655.094 3.93 2.071 3.93s3.172-2.275 2.07-3.93l-.195-.294v-2.132c0-1.917-.015-2.155-.14-2.299-.079-.095-1.938-.946-4.462-2.036l-4.328-1.861.265-.12c.149-.063 2.188-.962 4.532-1.996l4.274-1.878h2.555c1.781 0 2.656-.032 2.883-.095.672-.207 1.297-1.082 1.297-1.814 0-.676-.477-1.424-1.078-1.702-.29-.135-.313-.167-.242-.342.195-.533.015-1.241-.454-1.774-.562-.644-.531-.636-4.633-.636h-3.57l-.04-.708c-.078-1.289-.672-2.22-1.766-2.776l-.593-.295H16.38l-.524.255a3.183 3.183 0 0 0-1.813 2.418l-.086.549-3.242-2.124c-1.782-1.162-3.383-2.18-3.555-2.26-.453-.214-1.149-.198-1.641.04Zm1.234 1.17c.094.056 1.766 1.13 3.712 2.402l3.531 2.307V17.652l-.257-.032c-.383-.04-7.837-4.948-8.001-5.258-.32-.628.39-1.328 1.015-1.002Zm24.699 1.28c.43.128 1.078.788 1.203 1.226.062.214.094.93.094 2.052v1.718h-.625v-1.4c0-1.702-.055-1.917-.586-2.458-.493-.509-.782-.597-1.907-.597-.82 0-.883.009-1.063.2a.625.625 0 0 0-.195.437c0 .151.07.318.195.437.18.191.243.2 1.055.2.813 0 .875.007 1.055.198.11.104.195.247.195.318 0 .104-.726.12-6.875.12-6.15 0-6.876-.016-6.876-.12 0-.071.086-.214.195-.318l.188-.199h9.235l.188-.199a.625.625 0 0 0 .195-.437.625.625 0 0 0-.195-.438l-.188-.199h-4.625c-3.4 0-4.712.024-4.946.096-.203.064-.469.247-.711.501-.532.541-.586.756-.586 2.458v1.4h-.625v-1.718c0-1.122.03-1.838.093-2.052.118-.406.774-1.09 1.157-1.217.414-.128 14.517-.136 14.955-.008ZM30.873 17v.636H17.122V16.363H30.873V17Zm10.431-.438c.125.12.196.287.196.438 0 .15-.07.318-.196.437l-.187.2h-7.118v-1.274h7.118l.187.2Zm1.25 2.546a.591.591 0 0 1 0 .875l-.187.199H5.628l-.187-.2a.625.625 0 0 1-.196-.437c0-.15.07-.318.196-.437l.187-.2H42.367l.188.2Zm-16.744 6.69 10.064 4.35v2.8h-1.25v-1.081c0-.923-.024-1.114-.133-1.249-.078-.095-1.82-.907-3.97-1.853l-6.953-3.055c-7.868-3.46-9.532-4.192-9.564-4.224-.015-.016.368-.032.86-.032h.883l10.063 4.344Zm.844-3.31c-1.312.573-2.453 1.058-2.547 1.082-.101.024-1.031-.334-2.57-1.002a153.582 153.582 0 0 1-2.454-1.074c-.016-.024 2.211-.04 4.962-.04h4.992l-2.383 1.034Zm7.337-1.002c-.063.064-7.29 3.23-7.376 3.23-.054 0-.297-.088-.555-.191-.445-.183-.453-.199-.265-.279.11-.047 1.601-.7 3.32-1.44l3.126-1.352h.89c.493 0 .876.016.86.032Zm-12.103 4.876c.258.112.445.231.414.263-.031.032-1.992.907-4.36 1.94-2.406 1.059-4.36 1.958-4.43 2.053-.117.135-.14.326-.14 1.249v1.082H12.12v-2.8l4.595-1.989a591.65 591.65 0 0 1 4.64-2.005c.032 0 .266.088.532.207Zm4.172 1.83 1.946.859-2.008.024c-1.102.008-2.899.008-3.993 0l-1.992-.024 1.89-.843c1.048-.47 1.97-.851 2.056-.86.086-.007 1.031.375 2.101.844Zm5.634 2.49.703.31H15.598l.704-.31.703-.31H30.99l.703.31Zm-18.455 3.611c.804.342 1 1.408.375 2.044-.508.517-1.227.517-1.735 0-.969-.978.102-2.585 1.36-2.044Zm22.502 0c.805.342 1 1.408.375 2.044-.508.517-1.226.517-1.734 0-.97-.978.101-2.585 1.36-2.044Z");
    			attr_dev(path, "fill", "#313131");
    			add_location(path, file$a, 0, 89, 89);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$a, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "48" },
    				{ height: "48" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_safety_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_safety_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_safety_svg_rollup_plugin",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/empresa/assets/icon-sidepanels.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$9 = "src/empresa/assets/icon-sidepanels.svg.rollup-plugin.svelte";

    function create_fragment$c(ctx) {
    	let svg;
    	let path0;
    	let path1;
    	let path2;

    	let svg_levels = [
    		{ width: "48" },
    		{ height: "48" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			attr_dev(path0, "d", "M13.795 17.028c-.344-.337-.225-.92.225-1.109.077-.028 2.518-.056 5.416-.056l5.283-.007.225.204c.19.168.231.252.231.498 0 .245-.042.33-.231.498l-.232.203-5.36-.014-5.367-.02-.19-.197ZM11.213 15.92c-.435.182-.568.771-.238 1.094a.994.994 0 0 0 .435.224c.224.035.287.007.512-.217.231-.232.252-.288.217-.52-.077-.462-.526-.743-.926-.582Z");
    			attr_dev(path0, "fill", "#313131");
    			add_location(path0, file$9, 0, 89, 89);
    			attr_dev(path1, "fill-rule", "evenodd");
    			attr_dev(path1, "clip-rule", "evenodd");
    			attr_dev(path1, "d", "M9.425 24.2h31.31c.597-.066.76-.212 1.104-.556.744-.744.82-1.817.196-2.708l-.28-.4.14-.183c.82-1.115.716-2.68-.253-3.648-.19-.19-.477-.414-.631-.491-.702-.358-.723-.358-6.37-.358h-5.277l-.091-.266c-.295-.912-1.01-1.783-1.775-2.14l-.018-.009c-.119-.056-.22-.104-.324-.146-.62-.245-1.338-.245-6.33-.245l-5.403-.007-1.509-2.533c-1.684-2.828-1.936-3.15-2.7-3.501-.555-.253-1.355-.323-1.86-.176-1.158.337-1.958 1.277-2.077 2.435-.084.82.05 1.193 1.017 2.8l.569.947-.386.049c-.779.105-1.431.568-1.747 1.242-.14.315-.148.42-.169 3.543-.014 2.119.007 3.346.057 3.585.203.99.947 1.979 1.81 2.414.36.183.635.29.997.352Zm1.072-15.977c.155.049.38.182.499.301.154.155 2.28 3.6 2.757 4.47.014.035-.709.056-1.607.056l-1.635-.007-.862-1.446c-.962-1.613-1.074-1.887-.94-2.378.126-.463.308-.688.729-.898.407-.204.638-.225 1.06-.098Zm16.264 6.412c.421.197.877.653 1.073 1.074.14.308.148.456.183 2.827l.035 2.512.196.19.19.196 12.208.07.19.197a.652.652 0 0 1 0 .94l-.19.196H9.529l-.322-.147c-.421-.197-.878-.653-1.074-1.074-.147-.315-.147-.4-.147-3.522 0-3.108.007-3.213.14-3.36.077-.085.203-.183.28-.218.078-.028 4.168-.049 9.087-.042l8.945.014.323.147Zm13.513 2.8c.526.266.758.638.758 1.235 0 .393-.028.505-.19.736-.105.148-.308.351-.456.45l-.26.175-5.352.02-5.354.015v-2.807h10.496l.358.176Z");
    			attr_dev(path1, "fill", "#313131");
    			add_location(path1, file$9, 0, 448, 448);
    			attr_dev(path2, "fill-rule", "evenodd");
    			attr_dev(path2, "clip-rule", "evenodd");
    			attr_dev(path2, "d", "m23.57 28.312-.112-.048c-7.701-3.327-9.335-4.033-9.366-4.064h-3.158l4.343 1.875c2.432 1.053 4.445 1.927 4.476 1.958.03.024-1.882.867-4.251 1.866-2.664 1.13-4.344 1.882-4.406 1.975-.085.116-.108.58-.108 2.222v2.067l-.194.287c-1.091 1.61.093 3.825 2.052 3.825s3.144-2.215 2.052-3.825c-.17-.256-.194-.364-.194-1.015V34.7h18.583v.735c0 .65-.023.76-.194 1.015-1.092 1.61.093 3.825 2.052 3.825s3.144-2.215 2.052-3.825l-.194-.287v-2.075c0-1.866-.015-2.098-.14-2.238-.077-.092-1.92-.92-4.42-1.982l-4.29-1.811.264-.117c.147-.062 2.168-.936 4.49-1.943l4.166-1.797h-3.175c-.062.063-7.224 3.144-7.309 3.144-.054 0-.294-.085-.55-.186-.44-.178-.449-.193-.263-.27l.03-.014c.242-.103 1.651-.708 3.261-1.388l3.026-1.286H28.92l-2.29.976c-1.302.558-2.432 1.03-2.525 1.053-.1.024-1.022-.325-2.547-.975a152.65 152.65 0 0 1-2.432-1.046.413.413 0 0 1 .102-.008H15.89l19.874 8.433v2.725h-1.238v-1.053c0-.898-.024-1.084-.132-1.216-.077-.093-1.804-.882-3.933-1.804-2.083-.898-5.188-2.237-6.891-2.973Zm-1.665.635c.255.108.441.225.41.256-.03.03-1.974.882-4.32 1.889-2.385 1.03-4.32 1.904-4.39 1.997-.116.132-.14.318-.14 1.216v1.053h-1.238v-2.725l4.552-1.936c2.501-1.069 4.569-1.944 4.6-1.951.03 0 .263.085.526.201Zm4.135 1.78 1.928.837-1.99.023c-1.092.008-2.873.008-3.957 0l-1.974-.023 1.873-.82c1.038-.457 1.952-.83 2.037-.837.085-.008 1.022.364 2.083.82Zm-8.974 2.122h13.86l1.393.604H15.672l1.394-.604Zm-3.732 3.818c.797.332.99 1.37.372 1.99-.504.503-1.216.503-1.72 0-.96-.953.101-2.517 1.348-1.99Zm22.299 0c.797.332.99 1.37.371 1.99-.503.503-1.215.503-1.718 0-.96-.953.1-2.517 1.347-1.99Z");
    			attr_dev(path2, "fill", "#313131");
    			add_location(path2, file$9, 0, 1789, 1789);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$9, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path0);
    			append_dev(svg, path1);
    			append_dev(svg, path2);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "48" },
    				{ height: "48" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_sidepanels_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_sidepanels_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_sidepanels_svg_rollup_plugin",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/empresa/assets/icon-accessory.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$8 = "src/empresa/assets/icon-accessory.svg.rollup-plugin.svelte";

    function create_fragment$b(ctx) {
    	let svg;
    	let path;

    	let svg_levels = [
    		{ width: "48" },
    		{ height: "48" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M24 8a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm0 30.545a14.545 14.545 0 1 1 0-29.09 14.545 14.545 0 0 1 0 29.09Zm8-15.272h-7.273V16a.727.727 0 1 0-1.454 0v7.273H16a.727.727 0 1 0 0 1.454h7.273V32a.728.728 0 0 0 1.454 0v-7.273H32a.728.728 0 0 0 0-1.454Z");
    			attr_dev(path, "fill", "#313131");
    			add_location(path, file$8, 0, 89, 89);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "48" },
    				{ height: "48" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon_accessory_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Icon_accessory_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon_accessory_svg_rollup_plugin",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src/empresa/assets/chevron.svg.rollup-plugin.svelte generated by Svelte v3.48.0 */

    const file$7 = "src/empresa/assets/chevron.svg.rollup-plugin.svelte";

    function create_fragment$a(ctx) {
    	let svg;
    	let g;
    	let path0;
    	let defs;
    	let clipPath;
    	let path1;

    	let svg_levels = [
    		{ width: "16" },
    		{ height: "16" },
    		{ fill: "none" },
    		{ xmlns: "http://www.w3.org/2000/svg" },
    		/*$$props*/ ctx[0]
    	];

    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			g = svg_element("g");
    			path0 = svg_element("path");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "m15.488 4.13.43.56a.405.405 0 0 1 .081.269.394.394 0 0 1-.11.256l-7.667 7.69A.313.313 0 0 1 8 13a.313.313 0 0 1-.222-.095L.111 5.215a.395.395 0 0 1-.11-.256.406.406 0 0 1 .08-.27l.43-.557a.341.341 0 0 1 .104-.09.305.305 0 0 1 .37.057l6.793 6.817c.061.061.14.095.222.095.082 0 .16-.034.222-.095l6.793-6.821a.327.327 0 0 1 .113-.075.3.3 0 0 1 .256.02c.04.021.075.053.104.09Z");
    			attr_dev(path0, "fill", "#333232");
    			add_location(path0, file$7, 0, 112, 112);
    			attr_dev(g, "clip-path", "url(#a)");
    			add_location(g, file$7, 0, 89, 89);
    			attr_dev(path1, "fill", "#fff");
    			attr_dev(path1, "d", "M0 0h16v16H0z");
    			add_location(path1, file$7, 0, 538, 538);
    			attr_dev(clipPath, "id", "a");
    			add_location(clipPath, file$7, 0, 521, 521);
    			add_location(defs, file$7, 0, 515, 515);
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, g);
    			append_dev(g, path0);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, path1);
    		},
    		p: function update(ctx, [dirty]) {
    			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
    				{ width: "16" },
    				{ height: "16" },
    				{ fill: "none" },
    				{ xmlns: "http://www.w3.org/2000/svg" },
    				dirty & /*$$props*/ 1 && /*$$props*/ ctx[0]
    			]));
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Chevron_svg_rollup_plugin', slots, []);

    	$$self.$$set = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(0, $$props = assign(assign({}, $$props), $$new_props));
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [$$props];
    }

    class Chevron_svg_rollup_plugin extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Chevron_svg_rollup_plugin",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/empresa/CustomizationBlock.svelte generated by Svelte v3.48.0 */
    const file$6 = "src/empresa/CustomizationBlock.svelte";

    function create_fragment$9(ctx) {
    	let div6;
    	let div0;
    	let icon;
    	let t0;
    	let div3;
    	let div1;
    	let t1;
    	let t2;
    	let div2;
    	let t3;
    	let t4;
    	let div5;
    	let div4;
    	let t5;
    	let t6;
    	let span;
    	let t8;
    	let chevron;
    	let current;
    	let mounted;
    	let dispose;

    	icon = new /*Icon*/ ctx[5]({
    			props: {
    				class: "acc-customization-icon-container__icon"
    			},
    			$$inline: true
    		});

    	chevron = new Chevron_svg_rollup_plugin({
    			props: { class: "acc-chevron" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div0 = element("div");
    			create_component(icon.$$.fragment);
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(/*value*/ ctx[2]);
    			t4 = space();
    			div5 = element("div");
    			div4 = element("div");
    			t5 = text(/*length*/ ctx[0]);
    			t6 = text(" options\n      ");
    			span = element("span");
    			span.textContent = " available";
    			t8 = space();
    			create_component(chevron.$$.fragment);
    			attr_dev(div0, "class", "acc-customization-icon-container");
    			add_location(div0, file$6, 40, 2, 1237);
    			attr_dev(div1, "class", "title");
    			add_location(div1, file$6, 45, 4, 1400);
    			attr_dev(div2, "class", "value");
    			add_location(div2, file$6, 46, 4, 1437);
    			attr_dev(div3, "class", "acc-customization-content");
    			add_location(div3, file$6, 44, 2, 1356);
    			attr_dev(span, "class", "acc-select-container__sticker__available");
    			add_location(span, file$6, 53, 6, 1605);
    			attr_dev(div4, "class", "acc-select-container__sticker");
    			add_location(div4, file$6, 51, 4, 1532);
    			attr_dev(div5, "class", "acc-select-container");
    			add_location(div5, file$6, 50, 2, 1493);
    			attr_dev(div6, "class", "acc-customization-select");
    			toggle_class(div6, "active", /*$configStore*/ ctx[4].selectorView === /*targetSelectView*/ ctx[3]);
    			add_location(div6, file$6, 21, 0, 683);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div0);
    			mount_component(icon, div0, null);
    			append_dev(div6, t0);
    			append_dev(div6, div3);
    			append_dev(div3, div1);
    			append_dev(div1, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			append_dev(div6, t4);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, t5);
    			append_dev(div4, t6);
    			append_dev(div4, span);
    			append_dev(div5, t8);
    			mount_component(chevron, div5, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div6, "click", /*click_handler*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    			if (!current || dirty & /*value*/ 4) set_data_dev(t3, /*value*/ ctx[2]);
    			if (!current || dirty & /*length*/ 1) set_data_dev(t5, /*length*/ ctx[0]);

    			if (dirty & /*$configStore, targetSelectView*/ 24) {
    				toggle_class(div6, "active", /*$configStore*/ ctx[4].selectorView === /*targetSelectView*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			transition_in(chevron.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			transition_out(chevron.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			destroy_component(icon);
    			destroy_component(chevron);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(4, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CustomizationBlock', slots, []);
    	let { length } = $$props;
    	let { title } = $$props;
    	let { value } = $$props;
    	let { targetSelectView } = $$props;

    	const icons = {
    		COLOR: Icon_color_svg_rollup_plugin,
    		ACCESSORIES: Icon_accessory_svg_rollup_plugin,
    		SIDE_PANEL: Icon_sidepanels_svg_rollup_plugin,
    		ASSIST_BAR: Icon_safety_svg_rollup_plugin,
    		HEADBOARD: Icon_headboard_svg_rollup_plugin
    	};

    	const Icon = icons[targetSelectView];
    	const writable_props = ['length', 'title', 'value', 'targetSelectView'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CustomizationBlock> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		configStore.update(s => {
    			if (s.selectorView === "COLOR") {
    				// color was too long, collapsed color will not move the scroll, we do it manually
    				try {
    					document.getElementById("empresa-configurator").scrollIntoView();
    				} catch {
    					
    				}
    			}

    			return {
    				...s,
    				selectorView: s.selectorView === targetSelectView
    				? null
    				: targetSelectView
    			};
    		});
    	};

    	$$self.$$set = $$props => {
    		if ('length' in $$props) $$invalidate(0, length = $$props.length);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('targetSelectView' in $$props) $$invalidate(3, targetSelectView = $$props.targetSelectView);
    	};

    	$$self.$capture_state = () => ({
    		length,
    		title,
    		value,
    		targetSelectView,
    		configStore,
    		IconHeadboard: Icon_headboard_svg_rollup_plugin,
    		IconColor: Icon_color_svg_rollup_plugin,
    		IconSafety: Icon_safety_svg_rollup_plugin,
    		IconSidepanels: Icon_sidepanels_svg_rollup_plugin,
    		IconAccessory: Icon_accessory_svg_rollup_plugin,
    		Chevron: Chevron_svg_rollup_plugin,
    		icons,
    		Icon,
    		$configStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('length' in $$props) $$invalidate(0, length = $$props.length);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('targetSelectView' in $$props) $$invalidate(3, targetSelectView = $$props.targetSelectView);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		length,
    		title,
    		value,
    		targetSelectView,
    		$configStore,
    		Icon,
    		icons,
    		click_handler
    	];
    }

    class CustomizationBlock extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			length: 0,
    			title: 1,
    			value: 2,
    			targetSelectView: 3,
    			icons: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CustomizationBlock",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*length*/ ctx[0] === undefined && !('length' in props)) {
    			console.warn("<CustomizationBlock> was created without expected prop 'length'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<CustomizationBlock> was created without expected prop 'title'");
    		}

    		if (/*value*/ ctx[2] === undefined && !('value' in props)) {
    			console.warn("<CustomizationBlock> was created without expected prop 'value'");
    		}

    		if (/*targetSelectView*/ ctx[3] === undefined && !('targetSelectView' in props)) {
    			console.warn("<CustomizationBlock> was created without expected prop 'targetSelectView'");
    		}
    	}

    	get length() {
    		throw new Error("<CustomizationBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set length(value) {
    		throw new Error("<CustomizationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<CustomizationBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<CustomizationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<CustomizationBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<CustomizationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get targetSelectView() {
    		throw new Error("<CustomizationBlock>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set targetSelectView(value) {
    		throw new Error("<CustomizationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icons() {
    		return this.$$.ctx[6];
    	}

    	set icons(value) {
    		throw new Error("<CustomizationBlock>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const isSidePanelAllowed = (state) => {
        if (state.variant === "ARC") {
            return false;
        }
        return true;
    };

    /* src/empresa/Preview.svelte generated by Svelte v3.48.0 */
    const file$5 = "src/empresa/Preview.svelte";

    // (7:2) {#if $configStore.liftingPole === "Included"}
    function create_if_block_4(ctx) {
    	let img;
    	let current;

    	img = new Img({
    			props: {
    				src: `/images/accessory/Accessory - Lifting Pole - Part 1.png`,
    				alt: `bedding`,
    				class: "image-frame-img"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(7:2) {#if $configStore.liftingPole === \\\"Included\\\"}",
    		ctx
    	});

    	return block;
    }

    // (19:2) {#if $configStore.sidePanel === "Included" && isSidePanelAllowed($configStore)}
    function create_if_block_3(ctx) {
    	let img;
    	let current;

    	img = new Img({
    			props: {
    				src: `/images/empresa/sidePanels/${/*$configStore*/ ctx[0].color}_1.png`,
    				alt: `${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const img_changes = {};
    			if (dirty & /*$configStore*/ 1) img_changes.src = `/images/empresa/sidePanels/${/*$configStore*/ ctx[0].color}_1.png`;
    			if (dirty & /*$configStore*/ 1) img_changes.alt = `${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`;
    			img.$set(img_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(19:2) {#if $configStore.sidePanel === \\\"Included\\\" && isSidePanelAllowed($configStore)}",
    		ctx
    	});

    	return block;
    }

    // (29:2) {#if $configStore.liftingPole === "Included"}
    function create_if_block_2(ctx) {
    	let img;
    	let current;

    	img = new Img({
    			props: {
    				src: `/images/accessory/Accessory - Lifting Pole - Part 2.png`,
    				alt: `bedding`
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(29:2) {#if $configStore.liftingPole === \\\"Included\\\"}",
    		ctx
    	});

    	return block;
    }

    // (35:2) {#if ["Long", "Short"].includes($configStore.assistBar)}
    function create_if_block_1(ctx) {
    	let img;
    	let current;

    	img = new Img({
    			props: {
    				src: `/images/accessory/Accessory - Assist Bar ${/*$configStore*/ ctx[0].assistBar}.png`,
    				alt: `bedding`
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const img_changes = {};
    			if (dirty & /*$configStore*/ 1) img_changes.src = `/images/accessory/Accessory - Assist Bar ${/*$configStore*/ ctx[0].assistBar}.png`;
    			img.$set(img_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(35:2) {#if [\\\"Long\\\", \\\"Short\\\"].includes($configStore.assistBar)}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if $configStore.safetyMat === "Included"}
    function create_if_block(ctx) {
    	let img;
    	let current;

    	img = new Img({
    			props: {
    				src: `/images/accessory/Accessory - Safety Mat.png`,
    				alt: `bedding`
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(img.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(img, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(img.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(img.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(img, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(41:2) {#if $configStore.safetyMat === \\\"Included\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div;
    	let t0;
    	let img0;
    	let t1;
    	let img1;
    	let t2;
    	let show_if_1 = /*$configStore*/ ctx[0].sidePanel === "Included" && isSidePanelAllowed(/*$configStore*/ ctx[0]);
    	let t3;
    	let img2;
    	let t4;
    	let t5;
    	let show_if = ["Long", "Short"].includes(/*$configStore*/ ctx[0].assistBar);
    	let t6;
    	let current;
    	let if_block0 = /*$configStore*/ ctx[0].liftingPole === "Included" && create_if_block_4(ctx);

    	img0 = new Img({
    			props: {
    				src: `/images/base/bedding.png`,
    				alt: `bedding`
    			},
    			$$inline: true
    		});

    	img1 = new Img({
    			props: {
    				src: `/images/empresa/headboards/${/*$configStore*/ ctx[0].variant}_${/*$configStore*/ ctx[0].color}.png`,
    				alt: `headboard - ${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`
    			},
    			$$inline: true
    		});

    	let if_block1 = show_if_1 && create_if_block_3(ctx);

    	img2 = new Img({
    			props: {
    				src: `/images/empresa/footboards/${/*$configStore*/ ctx[0].variant}_${/*$configStore*/ ctx[0].color}.png`,
    				alt: `footboard - ${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`
    			},
    			$$inline: true
    		});

    	let if_block2 = /*$configStore*/ ctx[0].liftingPole === "Included" && create_if_block_2(ctx);
    	let if_block3 = show_if && create_if_block_1(ctx);
    	let if_block4 = /*$configStore*/ ctx[0].safetyMat === "Included" && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(img0.$$.fragment);
    			t1 = space();
    			create_component(img1.$$.fragment);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			create_component(img2.$$.fragment);
    			t4 = space();
    			if (if_block2) if_block2.c();
    			t5 = space();
    			if (if_block3) if_block3.c();
    			t6 = space();
    			if (if_block4) if_block4.c();
    			attr_dev(div, "class", "image-frame");
    			add_location(div, file$5, 5, 0, 177);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			mount_component(img0, div, null);
    			append_dev(div, t1);
    			mount_component(img1, div, null);
    			append_dev(div, t2);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t3);
    			mount_component(img2, div, null);
    			append_dev(div, t4);
    			if (if_block2) if_block2.m(div, null);
    			append_dev(div, t5);
    			if (if_block3) if_block3.m(div, null);
    			append_dev(div, t6);
    			if (if_block4) if_block4.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$configStore*/ ctx[0].liftingPole === "Included") {
    				if (if_block0) {
    					if (dirty & /*$configStore*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const img1_changes = {};
    			if (dirty & /*$configStore*/ 1) img1_changes.src = `/images/empresa/headboards/${/*$configStore*/ ctx[0].variant}_${/*$configStore*/ ctx[0].color}.png`;
    			if (dirty & /*$configStore*/ 1) img1_changes.alt = `headboard - ${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`;
    			img1.$set(img1_changes);
    			if (dirty & /*$configStore*/ 1) show_if_1 = /*$configStore*/ ctx[0].sidePanel === "Included" && isSidePanelAllowed(/*$configStore*/ ctx[0]);

    			if (show_if_1) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*$configStore*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div, t3);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const img2_changes = {};
    			if (dirty & /*$configStore*/ 1) img2_changes.src = `/images/empresa/footboards/${/*$configStore*/ ctx[0].variant}_${/*$configStore*/ ctx[0].color}.png`;
    			if (dirty & /*$configStore*/ 1) img2_changes.alt = `footboard - ${/*$configStore*/ ctx[0].variant} - ${/*$configStore*/ ctx[0].color}`;
    			img2.$set(img2_changes);

    			if (/*$configStore*/ ctx[0].liftingPole === "Included") {
    				if (if_block2) {
    					if (dirty & /*$configStore*/ 1) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_2(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div, t5);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*$configStore*/ 1) show_if = ["Long", "Short"].includes(/*$configStore*/ ctx[0].assistBar);

    			if (show_if) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty & /*$configStore*/ 1) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block_1(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(div, t6);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}

    			if (/*$configStore*/ ctx[0].safetyMat === "Included") {
    				if (if_block4) {
    					if (dirty & /*$configStore*/ 1) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(div, null);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(img0.$$.fragment, local);
    			transition_in(img1.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(img2.$$.fragment, local);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(img0.$$.fragment, local);
    			transition_out(img1.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(img2.$$.fragment, local);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			destroy_component(img0);
    			destroy_component(img1);
    			if (if_block1) if_block1.d();
    			destroy_component(img2);
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(0, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Preview', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Preview> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Img,
    		configStore,
    		isSidePanelAllowed,
    		$configStore
    	});

    	return [$configStore];
    }

    class Preview extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Preview",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/empresa/Select/SelectAssistBar.svelte generated by Svelte v3.48.0 */

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (11:4) <SelectionGridItem       active={value === bar}       title={`${bar}`}       onClick={() => {         configStore.update((s) => {           return {             ...s,             assistBar: bar,           };         });       }}     >
    function create_default_slot_1$4(ctx) {
    	let selectiongriditemimage;
    	let t;
    	let current;

    	selectiongriditemimage = new SelectionGridItemImage({
    			props: {
    				src: `/images/empresa/accessory/${/*bar*/ ctx[4]} - preview.jpg`,
    				alt: /*bar*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditemimage.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditemimage, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditemimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditemimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditemimage, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(11:4) <SelectionGridItem       active={value === bar}       title={`${bar}`}       onClick={() => {         configStore.update((s) => {           return {             ...s,             assistBar: bar,           };         });       }}     >",
    		ctx
    	});

    	return block;
    }

    // (10:2) {#each bars as bar}
    function create_each_block$1(ctx) {
    	let selectiongriditem;
    	let current;

    	function func() {
    		return /*func*/ ctx[3](/*bar*/ ctx[4]);
    	}

    	selectiongriditem = new SelectionGridItem({
    			props: {
    				active: /*value*/ ctx[0] === /*bar*/ ctx[4],
    				title: `${/*bar*/ ctx[4]}`,
    				onClick: func,
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditem, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const selectiongriditem_changes = {};
    			if (dirty & /*value*/ 1) selectiongriditem_changes.active = /*value*/ ctx[0] === /*bar*/ ctx[4];

    			if (dirty & /*$$scope*/ 128) {
    				selectiongriditem_changes.$$scope = { dirty, ctx };
    			}

    			selectiongriditem.$set(selectiongriditem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(10:2) {#each bars as bar}",
    		ctx
    	});

    	return block;
    }

    // (9:0) <SelectionGrid visible={$configStore.selectorView === "ASSIST_BAR"}>
    function create_default_slot$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*bars*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*value, bars, configStore*/ 5) {
    				each_value = /*bars*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(9:0) <SelectionGrid visible={$configStore.selectorView === \\\"ASSIST_BAR\\\"}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let selectiongrid;
    	let current;

    	selectiongrid = new SelectionGrid({
    			props: {
    				visible: /*$configStore*/ ctx[1].selectorView === "ASSIST_BAR",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongrid.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongrid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const selectiongrid_changes = {};
    			if (dirty & /*$configStore*/ 2) selectiongrid_changes.visible = /*$configStore*/ ctx[1].selectorView === "ASSIST_BAR";

    			if (dirty & /*$$scope, value*/ 129) {
    				selectiongrid_changes.$$scope = { dirty, ctx };
    			}

    			selectiongrid.$set(selectiongrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(1, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectAssistBar', slots, []);
    	let { value } = $$props;
    	const bars = ["Long", "Short", "None"];
    	const writable_props = ['value'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectAssistBar> was created with unknown prop '${key}'`);
    	});

    	const func = bar => {
    		configStore.update(s => {
    			return { ...s, assistBar: bar };
    		});
    	};

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({
    		SelectionGrid,
    		SelectionGridItem,
    		SelectionGridItemImage,
    		value,
    		configStore,
    		bars,
    		$configStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, $configStore, bars, func];
    }

    class SelectAssistBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { value: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectAssistBar",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<SelectAssistBar> was created without expected prop 'value'");
    		}
    	}

    	get value() {
    		throw new Error("<SelectAssistBar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<SelectAssistBar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/empresa/Select/SelectAccessories.svelte generated by Svelte v3.48.0 */

    // (8:2) <SelectionGridItem     active={$configStore.liftingPole === "Included"}     title="Lifting pole"     onClick={() => {       configStore.update((s) => {         return {           ...s,           liftingPole:             s.liftingPole === "Included" ? "Not included" : "Included",         };       });     }}   >
    function create_default_slot_2$1(ctx) {
    	let selectiongriditemimage;
    	let current;

    	selectiongriditemimage = new SelectionGridItemImage({
    			props: {
    				src: `/images/empresa/accessory/Lifting Pole - preview.jpg`,
    				alt: "Lifting pole"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditemimage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditemimage, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditemimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditemimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditemimage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(8:2) <SelectionGridItem     active={$configStore.liftingPole === \\\"Included\\\"}     title=\\\"Lifting pole\\\"     onClick={() => {       configStore.update((s) => {         return {           ...s,           liftingPole:             s.liftingPole === \\\"Included\\\" ? \\\"Not included\\\" : \\\"Included\\\",         };       });     }}   >",
    		ctx
    	});

    	return block;
    }

    // (26:2) <SelectionGridItem     active={$configStore.safetyMat === "Included"}     title="Safety mat"     onClick={() => {       configStore.update((s) => {         return {           ...s,           safetyMat: s.safetyMat === "Included" ? "Not included" : "Included",         };       });     }}   >
    function create_default_slot_1$3(ctx) {
    	let selectiongriditemimage;
    	let current;

    	selectiongriditemimage = new SelectionGridItemImage({
    			props: {
    				src: `/images/empresa/accessory/Safety Mat - preview.jpg`,
    				alt: "Lifting pole"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditemimage.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditemimage, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditemimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditemimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditemimage, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(26:2) <SelectionGridItem     active={$configStore.safetyMat === \\\"Included\\\"}     title=\\\"Safety mat\\\"     onClick={() => {       configStore.update((s) => {         return {           ...s,           safetyMat: s.safetyMat === \\\"Included\\\" ? \\\"Not included\\\" : \\\"Included\\\",         };       });     }}   >",
    		ctx
    	});

    	return block;
    }

    // (7:0) <SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"}>
    function create_default_slot$3(ctx) {
    	let selectiongriditem0;
    	let t;
    	let selectiongriditem1;
    	let current;

    	selectiongriditem0 = new SelectionGridItem({
    			props: {
    				active: /*$configStore*/ ctx[0].liftingPole === "Included",
    				title: "Lifting pole",
    				onClick: /*func*/ ctx[1],
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	selectiongriditem1 = new SelectionGridItem({
    			props: {
    				active: /*$configStore*/ ctx[0].safetyMat === "Included",
    				title: "Safety mat",
    				onClick: /*func_1*/ ctx[2],
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditem0.$$.fragment);
    			t = space();
    			create_component(selectiongriditem1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditem0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(selectiongriditem1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const selectiongriditem0_changes = {};
    			if (dirty & /*$configStore*/ 1) selectiongriditem0_changes.active = /*$configStore*/ ctx[0].liftingPole === "Included";

    			if (dirty & /*$$scope*/ 8) {
    				selectiongriditem0_changes.$$scope = { dirty, ctx };
    			}

    			selectiongriditem0.$set(selectiongriditem0_changes);
    			const selectiongriditem1_changes = {};
    			if (dirty & /*$configStore*/ 1) selectiongriditem1_changes.active = /*$configStore*/ ctx[0].safetyMat === "Included";

    			if (dirty & /*$$scope*/ 8) {
    				selectiongriditem1_changes.$$scope = { dirty, ctx };
    			}

    			selectiongriditem1.$set(selectiongriditem1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditem0.$$.fragment, local);
    			transition_in(selectiongriditem1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditem0.$$.fragment, local);
    			transition_out(selectiongriditem1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditem0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(selectiongriditem1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(7:0) <SelectionGrid visible={$configStore.selectorView === \\\"ACCESSORIES\\\"}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let selectiongrid;
    	let current;

    	selectiongrid = new SelectionGrid({
    			props: {
    				visible: /*$configStore*/ ctx[0].selectorView === "ACCESSORIES",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongrid.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongrid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const selectiongrid_changes = {};
    			if (dirty & /*$configStore*/ 1) selectiongrid_changes.visible = /*$configStore*/ ctx[0].selectorView === "ACCESSORIES";

    			if (dirty & /*$$scope, $configStore*/ 9) {
    				selectiongrid_changes.$$scope = { dirty, ctx };
    			}

    			selectiongrid.$set(selectiongrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(0, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectAccessories', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectAccessories> was created with unknown prop '${key}'`);
    	});

    	const func = () => {
    		configStore.update(s => {
    			return {
    				...s,
    				liftingPole: s.liftingPole === "Included"
    				? "Not included"
    				: "Included"
    			};
    		});
    	};

    	const func_1 = () => {
    		configStore.update(s => {
    			return {
    				...s,
    				safetyMat: s.safetyMat === "Included" ? "Not included" : "Included"
    			};
    		});
    	};

    	$$self.$capture_state = () => ({
    		SelectionGrid,
    		SelectionGridItem,
    		SelectionGridItemImage,
    		configStore,
    		$configStore
    	});

    	return [$configStore, func, func_1];
    }

    class SelectAccessories extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectAccessories",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/Radio.svelte generated by Svelte v3.48.0 */

    const file$4 = "src/components/Radio.svelte";

    function create_fragment$5(ctx) {
    	let div3;
    	let label;
    	let input;
    	let t0;
    	let span1;
    	let span0;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			span1 = element("span");
    			span0 = element("span");
    			div0 = element("div");
    			t1 = space();
    			div1 = element("div");
    			t2 = space();
    			div2 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(input, "class", "acc-input-radio");
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "name", /*name*/ ctx[2]);
    			input.__value = /*value*/ ctx[1];
    			input.value = input.__value;
    			input.required = true;
    			input.disabled = /*disabled*/ ctx[3];
    			/*$$binding_groups*/ ctx[7][0].push(input);
    			add_location(input, file$4, 8, 4, 203);
    			attr_dev(div0, "class", "acc-checkmark_stem");
    			add_location(div0, file$4, 19, 8, 421);
    			attr_dev(div1, "class", "acc-checkmark_tick");
    			add_location(div1, file$4, 20, 8, 464);
    			attr_dev(span0, "class", "acc-checkmark");
    			add_location(span0, file$4, 18, 6, 384);
    			attr_dev(div2, "class", "label-desc");
    			add_location(div2, file$4, 22, 6, 519);
    			attr_dev(span1, "class", "acc-custom-radio");
    			add_location(span1, file$4, 17, 4, 346);
    			attr_dev(label, "class", "acc-form-label-radio");
    			add_location(label, file$4, 7, 2, 162);
    			attr_dev(div3, "class", "acc-radio-container");
    			toggle_class(div3, "disabled", /*disabled*/ ctx[3]);
    			add_location(div3, file$4, 6, 0, 111);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, label);
    			append_dev(label, input);
    			input.checked = input.__value === /*group*/ ctx[0];
    			append_dev(label, t0);
    			append_dev(label, span1);
    			append_dev(span1, span0);
    			append_dev(span0, div0);
    			append_dev(span0, t1);
    			append_dev(span0, div1);
    			append_dev(span1, t2);
    			append_dev(span1, div2);

    			if (default_slot) {
    				default_slot.m(div2, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*name*/ 4) {
    				attr_dev(input, "name", /*name*/ ctx[2]);
    			}

    			if (!current || dirty & /*value*/ 2) {
    				prop_dev(input, "__value", /*value*/ ctx[1]);
    				input.value = input.__value;
    			}

    			if (!current || dirty & /*disabled*/ 8) {
    				prop_dev(input, "disabled", /*disabled*/ ctx[3]);
    			}

    			if (dirty & /*group*/ 1) {
    				input.checked = input.__value === /*group*/ ctx[0];
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*disabled*/ 8) {
    				toggle_class(div3, "disabled", /*disabled*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input), 1);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Radio', slots, ['default']);
    	let { value } = $$props;
    	let { name } = $$props;
    	let { group } = $$props;
    	let { disabled = false } = $$props;
    	const writable_props = ['value', 'name', 'group', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Radio> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		group = this.__value;
    		$$invalidate(0, group);
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('group' in $$props) $$invalidate(0, group = $$props.group);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ value, name, group, disabled });

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('group' in $$props) $$invalidate(0, group = $$props.group);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		group,
    		value,
    		name,
    		disabled,
    		$$scope,
    		slots,
    		input_change_handler,
    		$$binding_groups
    	];
    }

    class Radio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { value: 1, name: 2, group: 0, disabled: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Radio",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
    			console.warn("<Radio> was created without expected prop 'value'");
    		}

    		if (/*name*/ ctx[2] === undefined && !('name' in props)) {
    			console.warn("<Radio> was created without expected prop 'name'");
    		}

    		if (/*group*/ ctx[0] === undefined && !('group' in props)) {
    			console.warn("<Radio> was created without expected prop 'group'");
    		}
    	}

    	get value() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get group() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set group(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Radio>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Radio>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/empresa/Select/SelectSide.svelte generated by Svelte v3.48.0 */
    const file$3 = "src/empresa/Select/SelectSide.svelte";

    // (12:4) <Radio       name="sidePanel"       value="Included"       bind:group={$configStore.sidePanel}       disabled={!isSidePanelAllowed($configStore)}     >
    function create_default_slot_2(ctx) {
    	let t0;
    	let br;
    	let t1;

    	let t2_value = (!isSidePanelAllowed(/*$configStore*/ ctx[0])
    	? " - not available"
    	: "") + "";

    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("With side");
    			br = element("br");
    			t1 = text(" panels ");
    			t2 = text(t2_value);
    			add_location(br, file$3, 17, 15, 550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$configStore*/ 1 && t2_value !== (t2_value = (!isSidePanelAllowed(/*$configStore*/ ctx[0])
    			? " - not available"
    			: "") + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(12:4) <Radio       name=\\\"sidePanel\\\"       value=\\\"Included\\\"       bind:group={$configStore.sidePanel}       disabled={!isSidePanelAllowed($configStore)}     >",
    		ctx
    	});

    	return block;
    }

    // (23:6) <Radio         name="sidePanel"         bind:group={$configStore.sidePanel}         value="Not included"       >
    function create_default_slot_1$2(ctx) {
    	let t0;
    	let br;
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("Without side");
    			br = element("br");
    			t1 = text(" panels");
    			add_location(br, file$3, 27, 20, 804);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(23:6) <Radio         name=\\\"sidePanel\\\"         bind:group={$configStore.sidePanel}         value=\\\"Not included\\\"       >",
    		ctx
    	});

    	return block;
    }

    // (7:0) <SelectionGrid   {...$$restProps}   visible={$configStore.selectorView === "SIDE_PANEL"} >
    function create_default_slot$2(ctx) {
    	let div1;
    	let radio0;
    	let updating_group;
    	let t;
    	let div0;
    	let radio1;
    	let updating_group_1;
    	let current;

    	function radio0_group_binding(value) {
    		/*radio0_group_binding*/ ctx[2](value);
    	}

    	let radio0_props = {
    		name: "sidePanel",
    		value: "Included",
    		disabled: !isSidePanelAllowed(/*$configStore*/ ctx[0]),
    		$$slots: { default: [create_default_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*$configStore*/ ctx[0].sidePanel !== void 0) {
    		radio0_props.group = /*$configStore*/ ctx[0].sidePanel;
    	}

    	radio0 = new Radio({ props: radio0_props, $$inline: true });
    	binding_callbacks.push(() => bind(radio0, 'group', radio0_group_binding));

    	function radio1_group_binding(value) {
    		/*radio1_group_binding*/ ctx[3](value);
    	}

    	let radio1_props = {
    		name: "sidePanel",
    		value: "Not included",
    		$$slots: { default: [create_default_slot_1$2] },
    		$$scope: { ctx }
    	};

    	if (/*$configStore*/ ctx[0].sidePanel !== void 0) {
    		radio1_props.group = /*$configStore*/ ctx[0].sidePanel;
    	}

    	radio1 = new Radio({ props: radio1_props, $$inline: true });
    	binding_callbacks.push(() => bind(radio1, 'group', radio1_group_binding));

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(radio0.$$.fragment);
    			t = space();
    			div0 = element("div");
    			create_component(radio1.$$.fragment);
    			add_location(div0, file$3, 21, 4, 659);
    			attr_dev(div1, "class", "acc-radios-wrapper");
    			add_location(div1, file$3, 10, 2, 346);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(radio0, div1, null);
    			append_dev(div1, t);
    			append_dev(div1, div0);
    			mount_component(radio1, div0, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const radio0_changes = {};
    			if (dirty & /*$configStore*/ 1) radio0_changes.disabled = !isSidePanelAllowed(/*$configStore*/ ctx[0]);

    			if (dirty & /*$$scope, $configStore*/ 17) {
    				radio0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_group && dirty & /*$configStore*/ 1) {
    				updating_group = true;
    				radio0_changes.group = /*$configStore*/ ctx[0].sidePanel;
    				add_flush_callback(() => updating_group = false);
    			}

    			radio0.$set(radio0_changes);
    			const radio1_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				radio1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_group_1 && dirty & /*$configStore*/ 1) {
    				updating_group_1 = true;
    				radio1_changes.group = /*$configStore*/ ctx[0].sidePanel;
    				add_flush_callback(() => updating_group_1 = false);
    			}

    			radio1.$set(radio1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(radio0.$$.fragment, local);
    			transition_in(radio1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(radio0.$$.fragment, local);
    			transition_out(radio1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(radio0);
    			destroy_component(radio1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(7:0) <SelectionGrid   {...$$restProps}   visible={$configStore.selectorView === \\\"SIDE_PANEL\\\"} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let selectiongrid;
    	let current;

    	const selectiongrid_spread_levels = [
    		/*$$restProps*/ ctx[1],
    		{
    			visible: /*$configStore*/ ctx[0].selectorView === "SIDE_PANEL"
    		}
    	];

    	let selectiongrid_props = {
    		$$slots: { default: [create_default_slot$2] },
    		$$scope: { ctx }
    	};

    	for (let i = 0; i < selectiongrid_spread_levels.length; i += 1) {
    		selectiongrid_props = assign(selectiongrid_props, selectiongrid_spread_levels[i]);
    	}

    	selectiongrid = new SelectionGrid({
    			props: selectiongrid_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongrid.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongrid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const selectiongrid_changes = (dirty & /*$$restProps, $configStore*/ 3)
    			? get_spread_update(selectiongrid_spread_levels, [
    					dirty & /*$$restProps*/ 2 && get_spread_object(/*$$restProps*/ ctx[1]),
    					dirty & /*$configStore*/ 1 && {
    						visible: /*$configStore*/ ctx[0].selectorView === "SIDE_PANEL"
    					}
    				])
    			: {};

    			if (dirty & /*$$scope, $configStore*/ 17) {
    				selectiongrid_changes.$$scope = { dirty, ctx };
    			}

    			selectiongrid.$set(selectiongrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	const omit_props_names = [];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(0, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectSide', slots, []);

    	function radio0_group_binding(value) {
    		if ($$self.$$.not_equal($configStore.sidePanel, value)) {
    			$configStore.sidePanel = value;
    			configStore.set($configStore);
    		}
    	}

    	function radio1_group_binding(value) {
    		if ($$self.$$.not_equal($configStore.sidePanel, value)) {
    			$configStore.sidePanel = value;
    			configStore.set($configStore);
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    	};

    	$$self.$capture_state = () => ({
    		SelectionGrid,
    		configStore,
    		Radio,
    		isSidePanelAllowed,
    		$configStore
    	});

    	return [$configStore, $$restProps, radio0_group_binding, radio1_group_binding];
    }

    class SelectSide extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectSide",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/empresa/Select/SelectHeadboard.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$1 } = globals;

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i].title;
    	child_ctx[4] = list[i].isQuickship;
    	return child_ctx;
    }

    // (21:4) <SelectionGridItem       {isQuickship}       {title}       active={$configStore.variant === title}       onClick={() => {         configStore.update((s) => {           return {             ...s,             variant: title,             sidePanel: isSidePanelAllowed({ ...s, variant: title })               ? s.sidePanel               : "Not included",           };         });       }}     >
    function create_default_slot_1$1(ctx) {
    	let selectiongriditemimage;
    	let t;
    	let current;

    	selectiongriditemimage = new SelectionGridItemImage({
    			props: {
    				src: `/images/empresa/headboards_preview/${/*title*/ ctx[3]}.jpg`,
    				alt: /*title*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditemimage.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditemimage, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const selectiongriditemimage_changes = {};
    			if (dirty & /*variantsByOrder*/ 1) selectiongriditemimage_changes.src = `/images/empresa/headboards_preview/${/*title*/ ctx[3]}.jpg`;
    			if (dirty & /*variantsByOrder*/ 1) selectiongriditemimage_changes.alt = /*title*/ ctx[3];
    			selectiongriditemimage.$set(selectiongriditemimage_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditemimage.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditemimage.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditemimage, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(21:4) <SelectionGridItem       {isQuickship}       {title}       active={$configStore.variant === title}       onClick={() => {         configStore.update((s) => {           return {             ...s,             variant: title,             sidePanel: isSidePanelAllowed({ ...s, variant: title })               ? s.sidePanel               : \\\"Not included\\\",           };         });       }}     >",
    		ctx
    	});

    	return block;
    }

    // (20:2) {#each variantsByOrder as { title, isQuickship }}
    function create_each_block(ctx) {
    	let selectiongriditem;
    	let current;

    	function func() {
    		return /*func*/ ctx[2](/*title*/ ctx[3]);
    	}

    	selectiongriditem = new SelectionGridItem({
    			props: {
    				isQuickship: /*isQuickship*/ ctx[4],
    				title: /*title*/ ctx[3],
    				active: /*$configStore*/ ctx[1].variant === /*title*/ ctx[3],
    				onClick: func,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongriditem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongriditem, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const selectiongriditem_changes = {};
    			if (dirty & /*variantsByOrder*/ 1) selectiongriditem_changes.isQuickship = /*isQuickship*/ ctx[4];
    			if (dirty & /*variantsByOrder*/ 1) selectiongriditem_changes.title = /*title*/ ctx[3];
    			if (dirty & /*$configStore, variantsByOrder*/ 3) selectiongriditem_changes.active = /*$configStore*/ ctx[1].variant === /*title*/ ctx[3];
    			if (dirty & /*variantsByOrder*/ 1) selectiongriditem_changes.onClick = func;

    			if (dirty & /*$$scope, variantsByOrder*/ 129) {
    				selectiongriditem_changes.$$scope = { dirty, ctx };
    			}

    			selectiongriditem.$set(selectiongriditem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongriditem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongriditem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongriditem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(20:2) {#each variantsByOrder as { title, isQuickship }}",
    		ctx
    	});

    	return block;
    }

    // (19:0) <SelectionGrid visible={$configStore.selectorView === "HEADBOARD"}>
    function create_default_slot$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*variantsByOrder*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*variantsByOrder, $configStore, configStore, isSidePanelAllowed*/ 3) {
    				each_value = /*variantsByOrder*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(19:0) <SelectionGrid visible={$configStore.selectorView === \\\"HEADBOARD\\\"}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let selectiongrid;
    	let current;

    	selectiongrid = new SelectionGrid({
    			props: {
    				visible: /*$configStore*/ ctx[1].selectorView === "HEADBOARD",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(selectiongrid.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(selectiongrid, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const selectiongrid_changes = {};
    			if (dirty & /*$configStore*/ 2) selectiongrid_changes.visible = /*$configStore*/ ctx[1].selectorView === "HEADBOARD";

    			if (dirty & /*$$scope, variantsByOrder, $configStore*/ 131) {
    				selectiongrid_changes.$$scope = { dirty, ctx };
    			}

    			selectiongrid.$set(selectiongrid_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(selectiongrid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(selectiongrid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(selectiongrid, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let variantsByOrder;
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(1, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelectHeadboard', slots, []);
    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelectHeadboard> was created with unknown prop '${key}'`);
    	});

    	const func = title => {
    		configStore.update(s => {
    			return {
    				...s,
    				variant: title,
    				sidePanel: isSidePanelAllowed({ ...s, variant: title })
    				? s.sidePanel
    				: "Not included"
    			};
    		});
    	};

    	$$self.$capture_state = () => ({
    		SelectionGrid,
    		SelectionGridItem,
    		SelectionGridItemImage,
    		configStore,
    		bedVariants,
    		isSidePanelAllowed,
    		variantsByOrder,
    		$configStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('variantsByOrder' in $$props) $$invalidate(0, variantsByOrder = $$props.variantsByOrder);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(0, variantsByOrder = Object.entries(bedVariants).map(([bedVariant, colors]) => {
    		return {
    			title: bedVariant,
    			colors,
    			isQuickship: !!colors.find(item => {
    				var _a;

    				return (_a = item.options) === null || _a === void 0
    				? void 0
    				: _a.quickship;
    			})
    		};
    	}).sort(variant => variant.isQuickship ? -1 : 1));

    	return [variantsByOrder, $configStore, func];
    }

    class SelectHeadboard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelectHeadboard",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/components/ConfiguratorContainer.svelte generated by Svelte v3.48.0 */

    const file$2 = "src/components/ConfiguratorContainer.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "acc-configurator");
    			add_location(div, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ConfiguratorContainer', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ConfiguratorContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class ConfiguratorContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConfiguratorContainer",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/components/PreviewContainer.svelte generated by Svelte v3.48.0 */

    const file$1 = "src/components/PreviewContainer.svelte";

    function create_fragment$1(ctx) {
    	let div1;
    	let div0;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "acc-image-frame-container__sticky");
    			add_location(div0, file$1, 1, 2, 42);
    			attr_dev(div1, "class", "acc-image-frame-container");
    			add_location(div1, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			if (default_slot) {
    				default_slot.m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PreviewContainer', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PreviewContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class PreviewContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PreviewContainer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/empresa/App.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1 } = globals;
    const file = "src/empresa/App.svelte";

    // (17:2) <PreviewContainer>
    function create_default_slot_1(ctx) {
    	let preview;
    	let current;
    	preview = new Preview({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(preview.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(preview, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(preview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(preview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(preview, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(17:2) <PreviewContainer>",
    		ctx
    	});

    	return block;
    }

    // (16:0) <ConfiguratorContainer>
    function create_default_slot(ctx) {
    	let previewcontainer;
    	let t0;
    	let div6;
    	let div3;
    	let div0;
    	let t1_value = /*config*/ ctx[0].mainTitle + "";
    	let t1;
    	let t2;
    	let div2;
    	let customizationblock0;
    	let t3;
    	let selectheadboard;
    	let t4;
    	let customizationblock1;
    	let t5;
    	let selectpreviewcolor;
    	let t6;
    	let customizationblock2;
    	let t7;
    	let selectside;
    	let t8;
    	let customizationblock3;
    	let t9;
    	let selectassisbar;
    	let updating_value;
    	let t10;
    	let customizationblock4;
    	let t11;
    	let selectaccessories;
    	let t12;
    	let div1;
    	let t14;
    	let div5;
    	let div4;
    	let a;
    	let t15;
    	let a_href_value;
    	let t16;
    	let p;
    	let current;
    	let mounted;
    	let dispose;

    	previewcontainer = new PreviewContainer({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	customizationblock0 = new CustomizationBlock({
    			props: {
    				title: "Headboard",
    				targetSelectView: "HEADBOARD",
    				value: /*$configStore*/ ctx[1].variant,
    				length: Object.keys(bedVariants).length
    			},
    			$$inline: true
    		});

    	selectheadboard = new SelectHeadboard({ $$inline: true });

    	customizationblock1 = new CustomizationBlock({
    			props: {
    				title: "Color",
    				targetSelectView: "COLOR",
    				value: /*$configStore*/ ctx[1].color,
    				length: /*availableColors*/ ctx[2].length
    			},
    			$$inline: true
    		});

    	selectpreviewcolor = new SelectPreviewColor({
    			props: { colors: /*availableColors*/ ctx[2] },
    			$$inline: true
    		});

    	customizationblock2 = new CustomizationBlock({
    			props: {
    				title: "Side Panels",
    				targetSelectView: "SIDE_PANEL",
    				value: /*$configStore*/ ctx[1].sidePanel,
    				length: 2
    			},
    			$$inline: true
    		});

    	selectside = new SelectSide({ $$inline: true });

    	customizationblock3 = new CustomizationBlock({
    			props: {
    				title: "Assist Bar",
    				targetSelectView: "ASSIST_BAR",
    				value: /*$configStore*/ ctx[1].assistBar,
    				length: 2
    			},
    			$$inline: true
    		});

    	function selectassisbar_value_binding(value) {
    		/*selectassisbar_value_binding*/ ctx[3](value);
    	}

    	let selectassisbar_props = {};

    	if (/*$configStore*/ ctx[1].assistBar !== void 0) {
    		selectassisbar_props.value = /*$configStore*/ ctx[1].assistBar;
    	}

    	selectassisbar = new SelectAssistBar({
    			props: selectassisbar_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(selectassisbar, 'value', selectassisbar_value_binding));

    	customizationblock4 = new CustomizationBlock({
    			props: {
    				title: "Accessories",
    				targetSelectView: "ACCESSORIES",
    				value: /*$configStore*/ ctx[1].assistBar,
    				length: 2
    			},
    			$$inline: true
    		});

    	selectaccessories = new SelectAccessories({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(previewcontainer.$$.fragment);
    			t0 = space();
    			div6 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			create_component(customizationblock0.$$.fragment);
    			t3 = space();
    			create_component(selectheadboard.$$.fragment);
    			t4 = space();
    			create_component(customizationblock1.$$.fragment);
    			t5 = space();
    			create_component(selectpreviewcolor.$$.fragment);
    			t6 = space();
    			create_component(customizationblock2.$$.fragment);
    			t7 = space();
    			create_component(selectside.$$.fragment);
    			t8 = space();
    			create_component(customizationblock3.$$.fragment);
    			t9 = space();
    			create_component(selectassisbar.$$.fragment);
    			t10 = space();
    			create_component(customizationblock4.$$.fragment);
    			t11 = space();
    			create_component(selectaccessories.$$.fragment);
    			t12 = space();
    			div1 = element("div");
    			div1.textContent = "Reset to default options";
    			t14 = space();
    			div5 = element("div");
    			div4 = element("div");
    			a = element("a");
    			t15 = text("Book a demo");
    			t16 = space();
    			p = element("p");
    			p.textContent = "Quick delivery | 100-night risk-free trial | Training &\n          implementation.";
    			attr_dev(div0, "class", "acc-form-title");
    			add_location(div0, file, 22, 6, 919);
    			attr_dev(div1, "class", "reset-form");
    			add_location(div1, file, 61, 8, 2105);
    			attr_dev(div2, "class", "acc-form-content");
    			add_location(div2, file, 23, 6, 978);
    			attr_dev(div3, "class", "acc-form");
    			add_location(div3, file, 21, 4, 890);
    			attr_dev(a, "class", "acc-submit-button");
    			attr_dev(a, "href", a_href_value = /*config*/ ctx[0].bookADemoHref);
    			add_location(a, file, 75, 8, 2426);
    			attr_dev(p, "class", "booking-info");
    			add_location(p, file, 76, 8, 2507);
    			attr_dev(div4, "class", "acc-submit-content");
    			add_location(div4, file, 74, 6, 2385);
    			attr_dev(div5, "class", "acc-submit");
    			add_location(div5, file, 73, 4, 2354);
    			attr_dev(div6, "class", "acc-content");
    			add_location(div6, file, 20, 2, 860);
    		},
    		m: function mount(target, anchor) {
    			mount_component(previewcontainer, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div3);
    			append_dev(div3, div0);
    			append_dev(div0, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			mount_component(customizationblock0, div2, null);
    			append_dev(div2, t3);
    			mount_component(selectheadboard, div2, null);
    			append_dev(div2, t4);
    			mount_component(customizationblock1, div2, null);
    			append_dev(div2, t5);
    			mount_component(selectpreviewcolor, div2, null);
    			append_dev(div2, t6);
    			mount_component(customizationblock2, div2, null);
    			append_dev(div2, t7);
    			mount_component(selectside, div2, null);
    			append_dev(div2, t8);
    			mount_component(customizationblock3, div2, null);
    			append_dev(div2, t9);
    			mount_component(selectassisbar, div2, null);
    			append_dev(div2, t10);
    			mount_component(customizationblock4, div2, null);
    			append_dev(div2, t11);
    			mount_component(selectaccessories, div2, null);
    			append_dev(div2, t12);
    			append_dev(div2, div1);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, a);
    			append_dev(a, t15);
    			append_dev(div4, t16);
    			append_dev(div4, p);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div1, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const previewcontainer_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				previewcontainer_changes.$$scope = { dirty, ctx };
    			}

    			previewcontainer.$set(previewcontainer_changes);
    			if ((!current || dirty & /*config*/ 1) && t1_value !== (t1_value = /*config*/ ctx[0].mainTitle + "")) set_data_dev(t1, t1_value);
    			const customizationblock0_changes = {};
    			if (dirty & /*$configStore*/ 2) customizationblock0_changes.value = /*$configStore*/ ctx[1].variant;
    			customizationblock0.$set(customizationblock0_changes);
    			const customizationblock1_changes = {};
    			if (dirty & /*$configStore*/ 2) customizationblock1_changes.value = /*$configStore*/ ctx[1].color;
    			if (dirty & /*availableColors*/ 4) customizationblock1_changes.length = /*availableColors*/ ctx[2].length;
    			customizationblock1.$set(customizationblock1_changes);
    			const selectpreviewcolor_changes = {};
    			if (dirty & /*availableColors*/ 4) selectpreviewcolor_changes.colors = /*availableColors*/ ctx[2];
    			selectpreviewcolor.$set(selectpreviewcolor_changes);
    			const customizationblock2_changes = {};
    			if (dirty & /*$configStore*/ 2) customizationblock2_changes.value = /*$configStore*/ ctx[1].sidePanel;
    			customizationblock2.$set(customizationblock2_changes);
    			const customizationblock3_changes = {};
    			if (dirty & /*$configStore*/ 2) customizationblock3_changes.value = /*$configStore*/ ctx[1].assistBar;
    			customizationblock3.$set(customizationblock3_changes);
    			const selectassisbar_changes = {};

    			if (!updating_value && dirty & /*$configStore*/ 2) {
    				updating_value = true;
    				selectassisbar_changes.value = /*$configStore*/ ctx[1].assistBar;
    				add_flush_callback(() => updating_value = false);
    			}

    			selectassisbar.$set(selectassisbar_changes);
    			const customizationblock4_changes = {};
    			if (dirty & /*$configStore*/ 2) customizationblock4_changes.value = /*$configStore*/ ctx[1].assistBar;
    			customizationblock4.$set(customizationblock4_changes);

    			if (!current || dirty & /*config*/ 1 && a_href_value !== (a_href_value = /*config*/ ctx[0].bookADemoHref)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(previewcontainer.$$.fragment, local);
    			transition_in(customizationblock0.$$.fragment, local);
    			transition_in(selectheadboard.$$.fragment, local);
    			transition_in(customizationblock1.$$.fragment, local);
    			transition_in(selectpreviewcolor.$$.fragment, local);
    			transition_in(customizationblock2.$$.fragment, local);
    			transition_in(selectside.$$.fragment, local);
    			transition_in(customizationblock3.$$.fragment, local);
    			transition_in(selectassisbar.$$.fragment, local);
    			transition_in(customizationblock4.$$.fragment, local);
    			transition_in(selectaccessories.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(previewcontainer.$$.fragment, local);
    			transition_out(customizationblock0.$$.fragment, local);
    			transition_out(selectheadboard.$$.fragment, local);
    			transition_out(customizationblock1.$$.fragment, local);
    			transition_out(selectpreviewcolor.$$.fragment, local);
    			transition_out(customizationblock2.$$.fragment, local);
    			transition_out(selectside.$$.fragment, local);
    			transition_out(customizationblock3.$$.fragment, local);
    			transition_out(selectassisbar.$$.fragment, local);
    			transition_out(customizationblock4.$$.fragment, local);
    			transition_out(selectaccessories.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(previewcontainer, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div6);
    			destroy_component(customizationblock0);
    			destroy_component(selectheadboard);
    			destroy_component(customizationblock1);
    			destroy_component(selectpreviewcolor);
    			destroy_component(customizationblock2);
    			destroy_component(selectside);
    			destroy_component(customizationblock3);
    			destroy_component(selectassisbar);
    			destroy_component(customizationblock4);
    			destroy_component(selectaccessories);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(16:0) <ConfiguratorContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let configuratorcontainer;
    	let current;

    	configuratorcontainer = new ConfiguratorContainer({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(configuratorcontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(configuratorcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const configuratorcontainer_changes = {};

    			if (dirty & /*$$scope, config, $configStore, availableColors*/ 39) {
    				configuratorcontainer_changes.$$scope = { dirty, ctx };
    			}

    			configuratorcontainer.$set(configuratorcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(configuratorcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(configuratorcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(configuratorcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let availableColors;
    	let $configStore;
    	validate_store(configStore, 'configStore');
    	component_subscribe($$self, configStore, $$value => $$invalidate(1, $configStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { config } = $$props;
    	const writable_props = ['config'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function selectassisbar_value_binding(value) {
    		if ($$self.$$.not_equal($configStore.assistBar, value)) {
    			$configStore.assistBar = value;
    			configStore.set($configStore);
    		}
    	}

    	const click_handler = () => {
    		configStore.update(s => {
    			return initVal;
    		});
    	};

    	$$self.$$set = $$props => {
    		if ('config' in $$props) $$invalidate(0, config = $$props.config);
    	};

    	$$self.$capture_state = () => ({
    		bedVariants,
    		configStore,
    		initVal,
    		SelectPreviewColor,
    		CustomizationBlock,
    		Preview,
    		SelectAssisBar: SelectAssistBar,
    		SelectAccessories,
    		SelectSide,
    		SelectHeadboard,
    		ConfiguratorContainer,
    		PreviewContainer,
    		config,
    		availableColors,
    		$configStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('config' in $$props) $$invalidate(0, config = $$props.config);
    		if ('availableColors' in $$props) $$invalidate(2, availableColors = $$props.availableColors);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$configStore*/ 2) {
    			$$invalidate(2, availableColors = bedVariants[$configStore.variant]);
    		}
    	};

    	return [
    		config,
    		$configStore,
    		availableColors,
    		selectassisbar_value_binding,
    		click_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { config: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*config*/ ctx[0] === undefined && !('config' in props)) {
    			console.warn("<App> was created without expected prop 'config'");
    		}
    	}

    	get config() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set config(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const initConfig = {
        mainTitle: "Customize your Accora Floor Bed",
        bookADemoHref: "https://us.accora.care/book-a-demo",
    };
    const app = new App({
        target: document.getElementById("content"),
        props: {
            config: initConfig,
        },
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
