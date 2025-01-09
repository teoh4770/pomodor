interface SessionProps {
  completedSessions: number;
  targetSessions: number;
}

const Session = ({ completedSessions, targetSessions }: SessionProps) => (
  <div className="text-right text-sm">
    <p>
      <b className="text-lg font-bold">{completedSessions}</b>/{targetSessions}
    </p>
    <p>round{targetSessions > 1 && "s"}</p>
  </div>
);

export { Session };