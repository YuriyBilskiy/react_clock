import React from 'react';
import { Clock } from './Components/Clock/Clock';
function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  clockName: string;
  hasClock: boolean;
};
export class App extends React.Component {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
  };

  nameInterval: number | undefined;

  clockInterval: number | undefined;

  componentDidMount(): void {
    this.nameInterval = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);
    this.clockInterval = window.setInterval(() => {
      this.setState({ today: new Date() }, () => {
        if (this.state.hasClock) {
          // eslint-disable-next-line no-console
          console.log(this.state.today.toUTCString().slice(-12, -4));
        }
      });
    }, 1000);
  }

  componentWillUnmount(): void {
    window.clearInterval(this.nameInterval);
    window.clearInterval(this.clockInterval);
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }

    if (!prevState.hasClock && this.state.hasClock) {
      this.setState({ today: new Date() });
    }
  }

  render() {
    const { today, clockName, hasClock } = this.state;

    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      if (event.button === 2) {
        this.setState({ hasClock: false });
      }
    });

    document.addEventListener('click', (event: MouseEvent) => {
      if (event.button === 0) {
        this.setState({ hasClock: true });
      }
    });

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && <Clock today={today} clockName={clockName} />}
      </div>
    );
  }
}
