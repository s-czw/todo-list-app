import React, { useEffect, useState } from "react";
import { getRequest } from "../utils/apiUtils";
import { socket } from '../socket';

const ActivityFeed = ({
  todoId
}) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = () => {
      getRequest(`/activity?todoId=${todoId}`, {
        params: { todoId }
      }).then(data => {
        setActivities(data);
      }).catch(error => {
        console.error('Error fetching ActivityFeed:', error);
      });
    }

    fetchActivities();

    socket.on('updatedSharedTodo', (updatedTodo) => {
      if (todoId === updatedTodo._id) {
        fetchActivities();
      }
    });

    return () => socket.off('updatedSharedTodo');
  }, [todoId]);

  return (
    <div className="activity-feed">
      {activities.length === 0 ? (
        <p>No activities to show.</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={activity._id} className="mb-2">
              <span className="font-semibold">{index+1}. {activity.action}</span> by <em>{activity.userEmail}</em> on{' '}
              {new Date(activity.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ActivityFeed;