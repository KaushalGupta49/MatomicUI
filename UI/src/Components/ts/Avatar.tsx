"use client";
import {
  createContext,
  useContext,
  useState,
  Children,
  ReactNode,
  ReactElement,
  cloneElement,
  isValidElement,
} from "react";

type AvatarContextType = {
  isImageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
};

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

function useAvatarContext() {
  const context = useContext(AvatarContext);
  if (!context)
    throw new Error("Avatar.* components must be used inside <Avatar />");
  return context;
}

interface AvatarProps {
  children: ReactNode;
  className?: string;
}

export default function Avatar({ children, className = "" }: AvatarProps) {
  const [isImageLoaded, setImageLoaded] = useState(true);

  return (
    <AvatarContext.Provider value={{ isImageLoaded, setImageLoaded }}>
      <div
        className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 text-white w-10 h-10 overflow-hidden ${className}`}
      >
        {Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<any>, {})
            : child
        )}
      </div>
    </AvatarContext.Provider>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage = ({ src, alt = "", ...props }: AvatarImageProps) => {
  const { setImageLoaded } = useAvatarContext();

  const handleError = () => {
    setImageLoaded(false);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      className="object-cover"
      {...props}
    />
  );
};

interface AvatarFallbackTextProps {
  children: ReactNode;
  className?: string;
}

export const AvatarFallbackText = ({
  children,
  className = "",
}: AvatarFallbackTextProps) => {
  const { isImageLoaded } = useAvatarContext();

  if (isImageLoaded) {
    return null;
  } else {
    return (
      <span className={`text-sm font-medium ${className}`}>{children}</span>
    );
  }
};
