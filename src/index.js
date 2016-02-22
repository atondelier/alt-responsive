// import the responsive store class
import ResponsiveStore from './responsiveStore'

// the default breakpoints to use for the store
const default_breakpoints = {
    extra_small: 480,
    small: 768,
    medium: 992,
    large: 1200,
}

/**
 * @arg {object} [options]  - Hash of custom breakpoints.
 * @returns {class} Responsive store class to be passed to `alt.createStore`.
 */
// export the factory (but not as default)
export function create_responsive_store(breakpoints = default_breakpoints, innerWidthGetter) {
    // add `infinity` breakpoint for upper bound
    breakpoints.infinity = Infinity
    // return the store
    class ConfiguredResponsiveStore extends ResponsiveStore {
        get_breakpoints() {
            return breakpoints
        }
        get_inner_width() {
            if (typeof innerWidthGetter === 'function') {
                return innerWidthGetter.apply(this, arguments)
            }
            return super.get_inner_width()
        }
    }
    ConfiguredResponsiveStore.displayName = ResponsiveStore.displayName

    return ConfiguredResponsiveStore
}


// by default, export a ResponsiveStore with the default breakpoints
export default create_responsive_store()

// end of file
