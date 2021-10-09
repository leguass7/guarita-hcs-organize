import { css } from 'styled-components'

export const circularProgressbar = css`
  .CircularProgressbar {
    width: 100%;
    vertical-align: middle;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: #3e98c7;
    stroke-linecap: round;
    -webkit-transition: stroke-dashoffset 0.5s ease 0s;
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: #d6d6d6;
    stroke-linecap: round;
  }

  .CircularProgressbar .CircularProgressbar-text {
    fill: #3e98c7;
    font-size: 20px;
    dominant-baseline: middle;
    text-anchor: middle;
  }

  .CircularProgressbar .CircularProgressbar-background {
    fill: #d6d6d6;
  }

  /*
 * Sample background styles. Use these with e.g.:
 *
 *   <CircularProgressbar
 *     className="CircularProgressbar-inverted"
 *     background
 *     percentage={50}
 *   />
 */
  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background {
    fill: #3e98c7;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
    fill: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
    stroke: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
    stroke: transparent;
  }
`
